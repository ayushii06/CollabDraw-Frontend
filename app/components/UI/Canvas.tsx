"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import TextEditor from "./TextEditor";
import ZoomControls from "./ZoomControls";
import OptionControls from "./OptionControls";
import DrawingBoard from "./DrawingBoard";
import { useHistory } from "../../hooks/useHistory";
import { useDispatch } from "react-redux";
import { setIsDownload, setIsReset } from "../../store/slice/optionsSlice";
import { drawElement } from "../../engine/render/drawElement";
import { downloadCanvas } from "../../utils/downloadCanvas/downloadCanvas";
import { useAppSelector } from "../../hooks/reduxHooks";
import { SelectedElement } from "../../models/element/setSelectedElement";
import { Offset } from "../../models/types";
import throttle from "lodash.throttle";

import {
  drawHandle,
  drawSelectionBox,
} from "../../engine/render/drawSelectionBox";
import { useSocketEvents } from "../../hooks/socketHooks";
import { useParams } from "next/navigation";
import { socket } from "../../socket/socketClient";
import ToasterDemo from "../alerts/Toaster";
import LeaveRoom from "./LeaveRoom";
import RoomToolbar from "../room/RoomToolbar";

function Home() {
  const [panOffset, setPanOffset] = useState<Offset>({ x: 0, y: 0 });
  const [scale, setScale] = useState<number>(1);
  const [scaleOffset, setScaleOffset] = useState<Offset>({ x: 0, y: 0 });
  const [selectedElement, setSelectedElement] = useState<SelectedElement>(null);
  const [cursors, setCursors] = useState({});
  const [action, setAction] = useState<string>("none");
  const [startPanMousePosition, setStartPanMousePosition] = useState<Offset>({
    x: 0,
    y: 0,
  });
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const [elements, setElements, undo, redo, eraser,resetCanvas] = useHistory([]);
  const download = useAppSelector((state) => state.options.isDownload);
  const reset = useAppSelector((state) => state.options.isReset);
  const canvaBg = useAppSelector((state) => state.options.backgrounds);
  const dispatch = useDispatch();
  const params = useParams();
  const roomId = params.id as string;

  useSocketEvents({ setElements, setCursors });

  useEffect(() => {
    if (!reset) return;

    setElements([]); // clears all drawings
    setSelectedElement(null); // remove selection
    resetCanvas(); // clear history

    dispatch(setIsReset(false));
  }, [reset]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures it runs only once on mount

  useEffect(() => {
    if (download) {
      downloadCanvas(canvaBg);
      dispatch(setIsDownload(false)); // Reset download state if needed
    }
  }, [download, dispatch]);

  // console.log("elements uptil now, ", elements);

  /*
  -----------------------------------------------------------------
  --------------------x REDRAW ENGINE x----------------------------
  Whenver, the element updates, we need to re-draw it on the canvas, so we have used useLayoutEffect which updates the canvas whenver the following triggers - 
  1. New shape created / resized / moved
  2. Selected element changes
  3. Canvas panned
  4. Canvas zoomed
  5. Drawing / Moving / Writing...
  
  Why useLayoutEffect and not useEffect?
  Because, useLayoutEffect, calculates the position of element before the browser repaints. So it avoids flickering of the canvas.

  */
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //Canvas does not automatically rerender. So every frame we must:clear canvas -> draw everything again.

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scaleWidth = canvas.width * scale;
    const scaleHeight = canvas.height * scale;

    const scaleOffsetX = (scaleWidth - canvas.width) / 2;

    const scaleOffsetY = (scaleHeight - canvas.height) / 2;

    setScaleOffset((prev) => {
      if (prev.x === scaleOffsetX && prev.y === scaleOffsetY) {
        return prev;
      }
      return { x: scaleOffsetX, y: scaleOffsetY };
    });

    ctx.save();
    ctx.translate(
      panOffset.x * scale - scaleOffsetX,
      panOffset.y * scale - scaleOffsetY,
    );
    ctx.scale(scale, scale);

    // main rendering loop.
    if (elements) {
      elements.forEach((element) => {
        // console.log("elements for drawing",element);

        if (action === "write" && selectedElement.id === element.id) return;

        drawElement({ ctx, element });

        if (element.id === selectedElement?.id) {
          drawSelectionBox(ctx, element);
          drawHandle(ctx, element);
        }
      });
    }
    ctx.restore();
  }, [elements, selectedElement, panOffset, action, scale]);

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = throttle((e: MouseEvent) => {
      setCursorPosition({
        x: e.clientX,
        y: e.clientY,
      });

      socket.emit("cursor-move", {
        x: e.clientX,
        y: e.clientY,
        roomId,
      });
    }, 20);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const tool = useAppSelector((state) => state.toolbar.tool);
  const settings = useAppSelector((state) => state.menu);

  useEffect(() => {
    if (tool === "pen" || tool === "eraser") {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "default";
    }
  }, [tool]);



  return (
    <>
     <div className="absolute top-4 left-4 z-50 flex items-center ">
      
      <LeaveRoom />

      <RoomToolbar />

    </div>
  
      <div className="canva">
        <DrawingBoard
          canvasRef={canvasRef}
          canvaBg={canvaBg}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          panOffset={panOffset}
          setPanOffset={setPanOffset}
          scale={scale}
          scaleOffset={scaleOffset}
          action={action}
          setAction={setAction}
          elements={elements}
          setElements={setElements}
          startPanMousePosition={startPanMousePosition}
          setStartPanMousePosition={setStartPanMousePosition}
          eraser={eraser}
          windowSize={windowSize}
        />
      </div>
      {tool === "pen" && (
        <div
          style={{
            position: "fixed",
            left: cursorPosition.x,
            top: cursorPosition.y,
            width: settings.size,
            height: settings.size,
            background: settings.strokeColor,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 2000,
          }}
        />
      )}

      {tool === "eraser" && (
        <div
          style={{
            position: "fixed",
            left: cursorPosition.x,
            top: cursorPosition.y,
            width: 24,
            height: 24,
            border: "1px solid black",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.5)",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 2000,
          }}
        />
      )}

      {action === "write" ? (
        <TextEditor
          elements={elements}
          setElements={setElements}
          setPanOffset={setPanOffset}
          selectedElement={selectedElement}
          panOffset={panOffset}
          scale={scale}
          scaleOffset={scaleOffset}
          action={action}
          setAction={setAction}
          setSelectedElement={setSelectedElement}
        />
      ) : null}

      <ZoomControls
        scale={scale}
        setScale={setScale}
        setPanOffset={setPanOffset}
      />

      <OptionControls redo={redo} undo={undo} />
      {Object.values(cursors).map((cursor: any) => (
        <div
          key={cursor.userId}
          style={{
            position: "absolute",
            left: cursor.x,
            top: cursor.y,
            pointerEvents: "none",
            zIndex: "1000",
          }}
        >
          <div className="text-sm bg-purple-500 text-white px-2 py-1 rounded">
            {cursor.name}
          </div>

          <div>▲</div>
        </div>
      ))}

      <ToasterDemo/>

      <p
        style={{ zIndex: 2 }}
        className="font-bold max-md:text-sm max-md:w-2/12 max-sm:bottom-16 max-sm:text-xs absolute py-2 px-2 text-gray-400 flex items-center justify-center bottom-4 left-4 rounded-xl bg-gray-100"
      >
        CREATED BY AYUSHI PAL
      </p>
    </>
  );
}

export default Home;
