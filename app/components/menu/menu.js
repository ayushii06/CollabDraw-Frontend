"use client";

import Image from "next/image";
import { useState } from "react";
import { colors, fillColors } from "../../constant";
import { useSelector, useDispatch } from "react-redux";
import {
  setColor,
  setSize,
  setSmoothing,
  setThinning,
  setStreamline,
  setFill,
  setFillStyle,
  setStyle,
} from "../../slice/menuSlice";

import colorWheel from "../../../public/toolbar/color-wheel.png";

export default function Menu() {
  const tool = useSelector((state) => state.toolbar.tool);
  const dispatch = useDispatch();

  const [selected, setSelected] = useState({
    color: "#1d1d1d",
    size: 9,
    thinning: 0.73,
    smoothing: 0.45,
    streamline: 0.53,
    fill: "white",
    fillStyle: "solid",
    style: "solid",
  });

  const changeColor = (tool, newColor) => {
    dispatch(setColor({ item: tool, color: newColor }));
    setSelected({ ...selected, color: newColor });
  };

  const changeSize = (size) => {
    dispatch(setSize({ item: tool, size }));
    setSelected({ ...selected, size });
  };

  const changeThinning = (value) => {
    dispatch(setThinning({ thinning: value }));
    setSelected({ ...selected, thinning: value });
  };

  const changeSmoothing = (value) => {
    dispatch(setSmoothing({ smoothing: value }));
    setSelected({ ...selected, smoothing: value });
  };

  const changeStreamline = (value) => {
    dispatch(setStreamline({ stream: value }));
    setSelected({ ...selected, streamline: value });
  };

  const changeFill = (fill) => {
    dispatch(setFill({ item: tool, fill }));
    setSelected({ ...selected, fill });
  };

  const changeFillStyle = (style) => {
    dispatch(setFillStyle({ item: tool, fill: style }));
    setSelected({ ...selected, fillStyle: style });
  };

  const changeStyle = (style) => {
    dispatch(setStyle({ item: tool, fill: style }));
    setSelected({ ...selected, style });
  };

  const showStrokeTool =
    tool === "pen" ||
    tool === "arrow" ||
    tool === "line" ||
    tool === "rectangle" ||
    tool === "circle";

  const showColorTool =
    tool === "pen" ||
    tool === "text" ||
    tool === "arrow" ||
    tool === "line" ||
    tool === "rectangle" ||
    tool === "circle";

  const showPenTool = tool === "pen";

  const showFillTool = tool === "rectangle" || tool === "circle";

  return (
    <>
      {(showStrokeTool || showColorTool || showPenTool || showFillTool) && (
        <div
          className="
          absolute top-4 left-4
          w-64
          bg-white
          border border-gray-200
          rounded-xl
          shadow-lg
          p-4
          space-y-5
          max-h-[420px]
          overflow-y-auto
          "
          style={{ zIndex: 100 }}
        >
          {/* COLOR */}
          {showColorTool && (
            <div>
              <p className="text-sm text-gray-500 mb-2">Color</p>

              <div className="flex flex-wrap gap-2">
                {Object.keys(colors).map((color) => (
                  <button
                    key={color}
                    onClick={() => changeColor(tool, colors[color])}
                    className={`w-6 h-6 rounded-md border
                    ${
                      selected.color === colors[color]
                        ? "ring-2 ring-blue-500"
                        : ""
                    }`}
                    style={{ backgroundColor: colors[color] }}
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
                  onChange={(e) => changeColor(tool, e.target.value)}
                />
              </div>
            </div>
          )}

          {/* WIDTH */}
          {showStrokeTool && (
            <div>
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Width</span>
                <span>{selected.size}</span>
              </div>

              <input
                type="range"
                min="1"
                max="50"
                value={selected.size}
                onChange={(e) => changeSize(e.target.value)}
                className="w-full accent-blue-500"
              />
            </div>
          )}

          {/* PEN SETTINGS */}
          {showPenTool && (
            <>
              <div>
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Thinning</span>
                  <span>{selected.thinning}</span>
                </div>

                <input
                  type="range"
                  min="-0.99"
                  max="0.99"
                  step="0.01"
                  value={selected.thinning}
                  onChange={(e) =>
                    changeThinning(parseFloat(e.target.value))
                  }
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Smoothing</span>
                  <span>{selected.smoothing}</span>
                </div>

                <input
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  value={selected.smoothing}
                  onChange={(e) =>
                    changeSmoothing(parseFloat(e.target.value))
                  }
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Streamline</span>
                  <span>{selected.streamline}</span>
                </div>

                <input
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  value={selected.streamline}
                  onChange={(e) =>
                    changeStreamline(parseFloat(e.target.value))
                  }
                  className="w-full accent-blue-500"
                />
              </div>
            </>
          )}

          {/* FILL */}
          {showFillTool && (
            <>
              <div>
                <p className="text-sm text-gray-500 mb-2">Fill</p>

                <div className="flex flex-wrap gap-2">
                  {Object.keys(fillColors).map((color) => (
                    <button
                      key={color}
                      onClick={() => changeFill(fillColors[color])}
                      className={`w-6 h-6 rounded-md border
                      ${
                        selected.fill === fillColors[color]
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                      style={{
                        backgroundColor: fillColors[color],
                      }}
                    />
                  ))}

                  <label htmlFor="fillColor">
                    <Image
                      src={colorWheel}
                      alt="color"
                      className="w-6 h-6 cursor-pointer"
                    />
                  </label>

                  <input
                    type="color"
                    id="fillColor"
                    className="hidden"
                    onChange={(e) => changeFill(e.target.value)}
                  />
                </div>
              </div>

              {/* FILL STYLE */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Fill Style</p>

                <div className="flex flex-wrap gap-2">
                  {[
                    "solid",
                    "hachure",
                    "zig-zag",
                    "cross-hatch",
                    "dots",
                    "dashed",
                  ].map((style) => (
                    <button
                      key={style}
                      onClick={() => changeFillStyle(style)}
                      className={`px-2 py-1 text-xs rounded-md border
                      ${
                        selected.fillStyle === style
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-100"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* STROKE STYLE */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Stroke Style</p>

                <div className="flex gap-3">
                  {["solid", "dotted", "dashed"].map((style) => (
                    <button
                      key={style}
                      onClick={() => changeStyle(style)}
                      className={`flex items-center justify-center
                      h-8 w-8 rounded-md border
                      ${
                        selected.style === style
                          ? "bg-blue-500 text-white"
                          : ""
                      }`}
                    >
                      <div
                        style={{
                          width: "20px",
                          borderTop:
                            style === "solid"
                              ? "2px solid black"
                              : style === "dotted"
                              ? "2px dotted black"
                              : "2px dashed black",
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* TEXT */}
          {tool === "text" && (
            <div>
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Font Size</span>
                <span>{selected.size}</span>
              </div>

              <input
                type="range"
                min="1"
                max="100"
                value={selected.size}
                onChange={(e) => changeSize(e.target.value)}
                className="w-full accent-blue-500"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}