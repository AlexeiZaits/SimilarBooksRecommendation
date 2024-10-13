import { createSlice } from "@reduxjs/toolkit"


interface IInitialState {
    search: string
    debounceSearch: string,
}

const initialState:IInitialState = {
    search: "",
    debounceSearch: "",
}

export const searchSlice = createSlice({
    name: "@searchSlice",
    initialState: initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setDebounceSearch: (state, action) => {
            state.debounceSearch = action.payload
        },
        clearSearch: () => initialState
    }
})

export const {setSearch, clearSearch, setDebounceSearch} = searchSlice.actions
