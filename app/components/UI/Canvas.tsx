"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import TextEditor from "./TextEditor";
import ZoomControls from "./ZoomControls";
import OptionControls from "./OptionControls";
import DrawingBoard from "./DrawingBoard";
import { useHistory } from "../../hooks/useHistory";
import { drawElement } from "../../engine/render/drawElement";
import { downloadCanvas } from "../../utils/downloadCanvas/downloadCanvas";
import {drawHandle, drawSelectionBox} from "../../engine/render/drawSelectionBox";
import { useSocketEvents } from "../../hooks/socketHooks";
import { useParams } from "next/navigation";
import { useTool } from "../../context/toolContext/useTool";
import { useCanvas } from "../../context/canvasContext/useCanvas";
import { useRoom } from "../../context/roomContext/useRoom";

function Home({cursorPosition,setElements,resetCanvas,elements,redo,undo}) {
  const {setSelectedElement,setWindowSize,scale,setScaleOffset,panOffset,action,selectedElement,isReset,download,canvaBg,setIsReset,setIsDownload} = useCanvas();
  const {roomId} = useRoom();
  useEffect(() => {
    if (!isReset) return;

    setElements([]); // clears all drawings
    setSelectedElement(null); // remove selection
    resetCanvas(); // clear history

    setIsReset(false);
  }, [isReset]);

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
      setIsDownload(false); // Reset download state if needed
    }
  }, [download]);

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

  

  const {selectedTool,options} = useTool();

  useEffect(() => {
    if (selectedTool === "pen" || selectedTool === "eraser") {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "default";
    }
  }, [selectedTool]);



  return (
    <>
     
  
      <div className="canva">
        <DrawingBoard
        elements={elements}
          canvasRef={canvasRef}
          setElements={setElements}
        />
      </div>
      {selectedTool === "pen" && (
        <div
          style={{
            position: "fixed",
            left: cursorPosition.x,
            top: cursorPosition.y,
            width: options.size,
            height: options.size,
            background: options.strokeColor,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 2000,
          }}
        />
      )}

      {selectedTool === "eraser" && (
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
        <TextEditor/>
      ) : null}

      <ZoomControls/>

      <OptionControls redo={redo} undo={undo} />

      
    </>
  );
}

export default Home;
