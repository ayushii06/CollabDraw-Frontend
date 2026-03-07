import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fillColor, strokeColor } from '../../utils/constants/colors'
import { Options, strokeStyle } from '../../models/types';


// export type MenuState = Record<ToolBar, Options>;

const initialState:Options = {
  strokeColor: strokeColor.BLACK,
  size: 1,
  thinning: 0.1,
  smoothing: 0.1,
  streamline: 0.1,
  fillColor: fillColor.TRANSPARENT,
  strokeStyle: "Solid",
};



export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        // Use PayloadAction to type the incoming data
        setStrokeColor: (state, action: PayloadAction<string>) => {
            state.strokeColor = action.payload
        },
        setSize: (state, action: PayloadAction<number>) => {
            state.size = action.payload
        },
        // For specific tool updates, we can hardcode the key
        setThinning: (state, action: PayloadAction<number>) => {
            state.thinning = action.payload
        },
        setSmoothing: (state, action: PayloadAction<number>) => {
            state.smoothing = action.payload
        },
        setStreamline: (state, action: PayloadAction<number>) => {
            state.streamline = action.payload
        },
        // ... apply similar logic to other reducers
        setFillColor: (state, action: PayloadAction<string>) => {
            state.fillColor = action.payload
        },
        setStrokeStyle: (state, action: PayloadAction<strokeStyle>) => {
            state.strokeStyle = action.payload
        },
    }
})

export const {setFillColor,setSize,setStrokeColor,setThinning,setSmoothing,setStreamline,setStrokeStyle} = menuSlice.actions
export default menuSlice.reducer
