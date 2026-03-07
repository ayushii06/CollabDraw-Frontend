"use client";

import Image from "next/image";
import colorWheel from "../../../public/toolbar/color-wheel.png";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { strokeStyle } from "../../models/types";
import { setFillColor, setSize, setSmoothing, setStreamline, setStrokeColor, setStrokeStyle, setThinning } from "../../store/slice/menuSlice";
import { fillColor, strokeColor } from "../../utils/constants/colors";

export default function Menu() {
  const dispatch = useAppDispatch();

  const activeTool = useAppSelector((state) => state.toolbar.tool);

  const settings = useAppSelector((state) => state.menu);
  console.log(settings);
  // --- Change Handlers (Dispatching directly to Redux) ---

  const changeStrokeColor = (value: string) => dispatch(setStrokeColor(value));
  const changeSize = (value: number) => dispatch(setSize(value));

  const changeThinning = (value: number) => {
    dispatch(setThinning(value));
  };

  const changeSmoothing = (value: number) => {
    dispatch(setSmoothing(value));
  };

  const changeStreamline = (value: number) => {
    dispatch(setStreamline(value));
  };

  const changeFillColor = (value: string) => {
    dispatch(setFillColor(value));
  };

  const changeStrokeStyle = (value: strokeStyle) => {
    dispatch(setStrokeStyle(value));
  };

  // --- Visibility Logic ---

  const showStrokeTool = ["pen", "line", "rectangle", "circle"].includes(
    activeTool,
  );
  const showColorTool = ["pen", "text", "line", "rectangle", "circle"].includes(
    activeTool,
  );
  const showPenTool = activeTool === "pen";
  const showFillTool = ["rectangle", "circle"].includes(activeTool);

  return (
    <>
      {(showStrokeTool || showColorTool || showPenTool || showFillTool) && (
        <div
          className="absolute top-4 left-4 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-4 space-y-5 max-h-[420px] overflow-y-auto"
          style={{ zIndex: 100 }}
        >
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
                      settings.strokeColor === value ? "ring-2 ring-blue-500" : ""
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
                <span>{activeTool === "text" ? "Font Size" : "Width"}</span>
                <span>{settings.size}</span>
              </div>
              <input
                type="range"
                min="1"
                max={activeTool === "text" ? 100 : 50}
                value={settings.size}
                onChange={(e) => changeSize(Number(e.target.value))}
                className="slider"
              />
            </div>
          )}

          {/* PEN SPECIFIC SETTINGS */}
          {showPenTool && (
            <>
              {[
                {
                  label: "Thinning",
                  val: settings.thinning,
                  fn: changeThinning,
                  min: 0.0,
                },
                {
                  label: "Smoothing",
                  val: settings.smoothing,
                  fn: changeSmoothing,
                  min: 0.0,
                },
                {
                  label: "Streamline",
                  val: settings.streamline,
                  fn: changeStreamline,
                  min: 0.0,
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>{item.label}</span>
                    <span>{item.val}</span>
                  </div>
                  <input
                    type="range"
                    min={item.min}
                    max="1"
                    step="0.01"
                    value={item.val}
                    onChange={(e) => item.fn(Number(e.target.value))}
                    className="slider"
                  />
                </div>
              ))}
            </>
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
                        settings.fillColor === fillColor[colorKey]
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
          {(activeTool === "line" ||
            activeTool === "rectangle" ||
            activeTool === "circle") && (
            <div>
              <p className="text-sm text-gray-500 mb-2">Stroke Style</p>
              <div className="flex gap-3">
                {(["Solid", "Dotted", "Dashed"] as strokeStyle[]).map(
                  (strokeStyle) => (
                    <button
                      key={strokeStyle}
                      onClick={() => changeStrokeStyle(strokeStyle)}
                      className={`h-8 w-8 rounded-md border flex items-center justify-center ${
                        settings.strokeStyle === strokeStyle ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      <div
                        className="w-5"
                        style={{
                          borderTop: `2px ${strokeStyle === "Solid" ? "Solid" : strokeStyle === "Dotted" ? "Dotted" : "Dashed"} ${settings.strokeStyle === strokeStyle ? "white" : "black"}`,
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
