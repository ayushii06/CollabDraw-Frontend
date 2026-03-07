import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { ToolBar } from '../../models/types';

interface ToolbarState {
    tool: ToolBar;
}

const initialState:ToolbarState = {
    tool : "pen"
}

export const toolbarSlice = createSlice({
    name : 'toolbar',
    initialState,
    reducers : {
        setTool : (state, action:PayloadAction<ToolBar>) => {
            state.tool = action.payload;
        },
    }
})

export const {setTool} = toolbarSlice.actions;
export default toolbarSlice.reducer;