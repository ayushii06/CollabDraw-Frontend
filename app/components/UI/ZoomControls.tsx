import Image from "next/image";
import plus from "../../../public/toolbar/plus.svg";
import minus from "../../../public/toolbar/minus.svg";
import { useEffect } from "react";
import { usePressedKeys } from "../../hooks/usePressedKeys";
import { Offset } from "./Home";

interface ZoomProps {
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  setPanOffset:React.Dispatch<React.SetStateAction<Offset>>;
}

function ZoomControls({ scale, setScale,setPanOffset }: ZoomProps) {
  const pressedKeys = usePressedKeys();
  const onZoom = (delta: number) => {
    setScale((prevState: number): number =>
      Math.min(Math.max(prevState + delta, 0.1), 2),
    );
  };

    useEffect(() => {
    const panOrZoomFunction = (event) => {
      if (pressedKeys.has("Control")) {
        onZoom(event.deltaY * -0.01);
      } else {
        setPanOffset((prevState) => ({
          x: prevState.x - event.deltaX,
          y: prevState.y - event.deltaY,
        }));
      }
    };

    document.addEventListener("wheel", panOrZoomFunction);
    return () => {
      document.removeEventListener("wheel", panOrZoomFunction);
    };
  }, [pressedKeys]);
  
  return (
    <div
      style={{ zIndex: 2 }}
      className="absolute flex items-center bottom-4 right-2 rounded-xl bg-gray-100"
    >
      <Image
        src={minus}
        alt="redo"
        onClick={() => onZoom(-0.1)}
        className="w-8 max-md:w-8 px-2 py-2 hover:bg-gray-300"
      />
      <div
        onClick={() => {
          setScale(1);
        }}
        className="text-slate-800 px-2 max-md:text-sm"
      >
        {new Intl.NumberFormat("en-GB", { style: "percent" }).format(scale)}
      </div>
      <Image
        src={plus}
        alt="undo"
        onClick={() => {
          onZoom(0.1);
        }}
        width={40}
        className="w-8 max-md:w-8 px-2 py-2 hover:bg-gray-300"
      />
    </div>
  );
}

export default ZoomControls;
