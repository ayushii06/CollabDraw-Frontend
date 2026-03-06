"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import TextEditor from "./TextEditor";
import ZoomControls from "./ZoomControls";
import OptionControls from "./OptionControls";
import DrawingBoard from "./DrawingBoard";
import { useHistory } from "../../hooks/useHistory";
import { useDispatch } from "react-redux";
import { setIsDownload, setIsReset } from "../../slice/optionsSlice";
import rough from "roughjs/bundled/rough.esm";
import { drawElement } from "../../utils/drawElement";
import { downloadCanvas } from "../../hooks/downloadCanvas";
import { useAppSelector } from "../../hooks/reduxHooks";
import { elementType } from "../../lib/types";

export type Offset = {
  x: number;
  y: number;
};

export type SelectedElement = elementType & {
  xOffsets?: Array<number>;
  yOffsets?: Array<number>;
  xOffset?: number;
  yOffset?: number;
};

function Home() {
  const [panOffset, setPanOffset] = useState<Offset>({ x: 0, y: 0 });
  const [scale, setScale] = useState<number>(1);
  const [scaleOffset, setScaleOffset] = useState<Offset>({ x: 0, y: 0 });
  const [selectedElement, setSelectedElement] =
    useState<SelectedElement>(null);
  const [action, setAction] = useState<string>("none");
  const [startPanMousePosition, setStartPanMousePosition] = useState<Offset>({
    x: 0,
    y: 0,
  });
  const [windowSize, setWindowSize] = useState<{width: number;height: number;}>
  ({ width: 0, height: 0 });

  const [elements, setElements, undo, redo, eraser] = useHistory([]);
  const download = useAppSelector((state) => state.options.isDownload);
  const reset = useAppSelector((state) => state.options.isReset);
  const canvaBg = useAppSelector((state) => state.options.backgrounds);
  const dispatch = useDispatch();
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

    
  if (reset) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    setElements([]);
    dispatch(setIsReset(false));
  }

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
  useLayoutEffect(() => {
    // IF USER HAS CLICKED RESET CANVAS BUTTON.
    if (reset) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      dispatch(setIsReset(false));
    }

    //Canvas does not automatically rerender. So every frame we must:clear canvas -> draw everything again.

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    const scaleWidth = canvas.width * scale;
    const scaleHeight = canvas.height * scale;

    const scaleOffsetX = (scaleWidth - canvas.width) / 2;

    const scaleOffsetY = (scaleHeight - canvas.height) / 2;

    setScaleOffset({ x: scaleOffsetX, y: scaleOffsetY });

    ctx.save();
    ctx.translate(
      panOffset.x * scale - scaleOffsetX,
      panOffset.y * scale - scaleOffsetY,
    );
    ctx.scale(scale, scale);

    // main rendering loop.
    if (elements) {
      elements.forEach((element) => {
        if (action === "write" && selectedElement.id === element.id) return;

        drawElement({ctx, element });
      });
    }
    ctx.restore();
  }, [elements, selectedElement, panOffset, action, scale]);

  return (
    <>
      <div className="canva">
        <DrawingBoard
          canvaBg={"white"}
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
          ctx={ctx}
        />
      </div>

      {action === "write" ? (
        <TextEditor
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
