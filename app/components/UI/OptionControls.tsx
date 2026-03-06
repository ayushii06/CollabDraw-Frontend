import Image from 'next/image'
import undoImg from "../../../public/toolbar/undo.svg";
import redoImg from "../../../public/toolbar/redo.svg";
import { useEffect } from 'react';

interface OptionsType{
      undo:()=>void;
      redo:()=>void;
}

function OptionControls({undo,redo}:OptionsType) {
  useEffect(() => {
    const undoRedoFunction = (e:KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") {
        undo();
      } else if (e.ctrlKey && e.key === "y") {
        redo();
      }
    };
    document.addEventListener("keydown", undoRedoFunction);

    return () => document.removeEventListener("keydown", undoRedoFunction);
  }, [undo, redo]);

  return (
    <div
        style={{ zIndex: 2 }}
        className="absolute flex items-center justify-center bottom-4 right-36 rounded-xl bg-gray-100"
      >
        <Image
          src={undoImg}
          alt="undo"
          onClick={undo}
          className="w-12 max-md:w-12 px-4 py-2 hover:bg-gray-300"
        />
        <Image
          src={redoImg}
          alt="redo"
          onClick={redo}
          className="w-12 max-md:w-12 px-4 py-2 hover:bg-gray-300"
        />
      </div>
  )
}

export default OptionControls