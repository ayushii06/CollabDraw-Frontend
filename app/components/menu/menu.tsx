"use client";

import Image from "next/image";
import colorWheel from "../../../public/toolbar/color-wheel.png";
import { strokeStyle } from "../../models/types";
import { fillColor, strokeColor } from "../../utils/constants/colors";
import { useTool } from "../../context/toolContext/useTool";

export default function Menu() {
  const { selectedTool, options, setOptions } = useTool();

  const changeStrokeColor = (value: string) => {
    setOptions((prev) => ({
      ...prev,
      strokeColor: value,
    }));
  };
  const changeSize = (value: number) => {
    setOptions((prev) => ({
      ...prev,
      size: value,
    }));
  };

  const changeFillColor = (value: string) => {
    setOptions((prev)=>({
      ...prev,
      fillColor:value,
    }));
  };
  
  const changeStrokeStyle = (value: strokeStyle) => {
    setOptions((prev)=>({
      ...prev,
      strokeStyle:value,
    }));
  };


  // --- Visibility Logic ---

  const showStrokeTool = ["pen", "line", "rectangle", "circle"].includes(
    selectedTool,
  );
  const showColorTool = ["pen", "text", "line", "rectangle", "circle"].includes(
    selectedTool,
  );
  const showPenTool = selectedTool === "pen";
  const showFillTool = ["rectangle", "circle"].includes(selectedTool);

  return (
    <>
      {(showStrokeTool || showColorTool || showPenTool || showFillTool) && (
        <div className="absolute top-4 right-4 w-64 bg-white border border-gray-200 z-40  rounded-xl shadow-lg p-4 space-y-5 max-h-[420px] overflow-y-auto">
          {/* COLOR SECTION */}
          {showColorTool && (
            <div>
              <p className="text-sm text-gray-500 mb-2">Stroke Color</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(strokeColor).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => changeStrokeColor(value)}
                    className={`w-6 h-6 rounded-md border ${
                      options.strokeColor === value
                        ? "ring-2 ring-blue-500"
                        : ""
                    }`}
                    style={{ backgroundColor: value }}
                  />
                ))}
                <label htmlFor="bgColor">
                  <Image
                    src={colorWheel}
                    alt="color"
                    className="w-6 h-6 cursor-pointer"
                  />
                </label>
                <input
                  type="color"
                  id="bgColor"
                  className="hidden"
                  onChange={(e) => changeStrokeColor(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* WIDTH / SIZE SECTION */}
          {showStrokeTool && (
            <div>
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>{selectedTool === "text" ? "Font Size" : "Width"}</span>
                <span>{options.size}</span>
              </div>
              <input
                type="range"
                min="1"
                max={selectedTool === "text" ? 100 : 10}
                value={options.size}
                onChange={(e) => changeSize(Number(e.target.value))}
                className="slider"
              />
            </div>
          )}

         

          {/* FILL SETTINGS */}
          {showFillTool && (
            <>
              <div>
                <p className="text-sm text-gray-500 mb-2">Fill Color</p>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(fillColor).map((colorKey) => (
                    <button
                      key={colorKey}
                      onClick={() => changeFillColor(fillColor[colorKey])}
                      className={`w-6 h-6 rounded-md border ${
                        options.fillColor === fillColor[colorKey]
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                      style={{ backgroundColor: fillColor[colorKey] }}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* STROKE STYLE (Line/Rect/Circle) */}
          {(selectedTool === "line" ||
            selectedTool === "rectangle" ||
            selectedTool === "circle") && (
            <div>
              <p className="text-sm text-gray-500 mb-2">Stroke Style</p>
              <div className="flex gap-3">
                {(["Solid", "Dotted", "Dashed"] as strokeStyle[]).map(
                  (strokeStyle) => (
                    <button
                      key={strokeStyle}
                      onClick={() => changeStrokeStyle(strokeStyle)}
                      className={`h-8 w-8 rounded-md border flex items-center justify-center ${
                        options.strokeStyle === strokeStyle
                          ? "bg-blue-500 text-white"
                          : ""
                      }`}
                    >
                      <div
                        className="w-5"
                        style={{
                          borderTop: `2px ${
                            strokeStyle === "Solid"
                              ? "Solid"
                              : strokeStyle === "Dotted"
                              ? "Dotted"
                              : "Dashed"
                          } ${
                            options.strokeStyle === strokeStyle
                              ? "white"
                              : "black"
                          }`,
                        }}
                      />
                    </button>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
