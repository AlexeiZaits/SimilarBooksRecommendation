import { createSlice } from "@reduxjs/toolkit"


interface IInitialState {
    search: string
}

const initialState:IInitialState = {
    search: ""
}

export const searchSlice = createSlice({
    name: "@searchSlice",
    initialState: initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        },
        clearSearch: () => initialState
    }
})

export const {setSearch, clearSearch} = searchSlice.actions
