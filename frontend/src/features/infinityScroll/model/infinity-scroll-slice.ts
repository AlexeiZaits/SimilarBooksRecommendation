import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    amountOffset: number,
}

const initialState: IInitialState = {
    amountOffset: 1,
}

export const infinityScrollSlice = createSlice({
    name: "@infinityScrollSlice",
    initialState: initialState,
    reducers: {
        incrementAmountOffset: (state,) => {
            ++state.amountOffset
        },
        clearAmountOffset: () => initialState,
    }
})

export const {incrementAmountOffset, clearAmountOffset} = infinityScrollSlice.actions
