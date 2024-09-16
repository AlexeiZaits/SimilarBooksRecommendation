import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INewInitialState, createInitialState } from "../lib/createInitialState";

export const initialState: INewInitialState = createInitialState()

export const togglerWidjetsSlice = createSlice({
    name: "@togglerWidjetsSlice",
    initialState,
    reducers: {
        toggleWidjet: (state, action:PayloadAction<{key: string}>) => {
            state[action.payload.key] = !state[action.payload.key]
        },
    }
})

export const {toggleWidjet} = togglerWidjetsSlice.actions
