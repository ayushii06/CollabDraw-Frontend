import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { tools, colors } from '../constant'


export enum Tool {
    Pen = "Pen",
    Eraser = "Eraser",
    Line = "Line",
    Rectangle = "Rectangle",
    Circle = "Circle",
    Text = "Text"
}

type BaseTool = {
    color: string;
    size: number;
};

type PenTool = BaseTool & {
    thinning: number;
    smoothing: number;
    streamline: number;
};

type ShapeTool = BaseTool & {
    fill: string;
    fillStyle: string;
    style: string;
};

type LineTool = BaseTool & {
    style: string;
};

export type MenuState = {
    [Tool.Pen]: PenTool;
    [Tool.Eraser]: BaseTool;
    [Tool.Line]: LineTool;
    [Tool.Rectangle]: ShapeTool;
    [Tool.Circle]: ShapeTool;
    [Tool.Text]: BaseTool;
};

const initialState: MenuState = {
    [Tool.Pen]: {
        color: colors.BLACK,
        size: 9,
        thinning: 0.73,
        smoothing: 0.43,
        streamline: 0.53
    },
    [Tool.Eraser]: {
        color: colors.WHITE,
        size: 3
    },
    [Tool.Line]: {
        color: colors.BLACK,
        size: 3,
        style: "solid"
    },
    [Tool.Rectangle]: {
        color: colors.BLACK,
        size: 3,
        fill: "white",
        fillStyle: "solid",
        style: "solid"
    },
    [Tool.Circle]: {
        color: colors.BLACK,
        size: 3,
        fill: "white",
        fillStyle: "solid",
        style: "solid"
    },
    [Tool.Text]: {
        color: colors.BLACK,
        size: 24
    }
};

export const menuSlice = createSlice({
  name: "toolbox",
  initialState,
  reducers: {
    setColor: (
      state,
      action: PayloadAction<{ item: Tool; color: string }>
    ) => {
      state[action.payload.item].color = action.payload.color;
    },

    setSize: (
      state,
      action: PayloadAction<{ item: Tool; size: number }>
    ) => {
      state[action.payload.item].size = action.payload.size;
    },

    setThinning: (
      state,
      action: PayloadAction<number>
    ) => {
      state[Tool.Pen].thinning = action.payload;
    },

    setSmoothing: (
      state,
      action: PayloadAction<number>
    ) => {
      state[Tool.Pen].smoothing = action.payload;
    },

    setStreamline: (
      state,
      action: PayloadAction<number>
    ) => {
      state[Tool.Pen].streamline = action.payload;
    },

    setFill: (
      state,
      action: PayloadAction<{
        item: Tool.Rectangle | Tool.Circle;
        fill: string;
      }>
    ) => {
      state[action.payload.item].fill = action.payload.fill;
    },

    setStyle: (
      state,
      action: PayloadAction<{
        item: Tool.Line | Tool.Rectangle | Tool.Circle;
        style: string;
      }>
    ) => {
      state[action.payload.item].style = action.payload.style;
    },

    setFillStyle: (
      state,
      action: PayloadAction<{
        item: Tool.Rectangle | Tool.Circle;
        fillStyle: string;
      }>
    ) => {
      state[action.payload.item].fillStyle = action.payload.fillStyle;
    }
  }
});

export const {
  setColor,
  setSize,
  setThinning,
  setSmoothing,
  setStreamline,
  setFill,
  setStyle,
  setFillStyle
} = menuSlice.actions;

export default menuSlice.reducer;