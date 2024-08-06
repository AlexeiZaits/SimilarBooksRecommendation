import { createSlice } from "@reduxjs/toolkit";
import { ErrorType, Status } from "shared/types";
import { IBook } from "shared/types/book";
import { actionFindMore, actionSearchBooks } from "./recommend-list-actions";

export interface IRecommendBooks{
    status: Status,
    error: ErrorType,
    books: Omit<IBook, "description">[],
}

const initialState: IRecommendBooks = {
    status: "idle",
    error: null,
    books: []
}

export const recommendListSlice = createSlice({
    name: "@recommendList",
    initialState: initialState,
    reducers: {
        clearRecommendBooks : () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(actionSearchBooks.pending, (state) => {
            state.status = "loading"
            state.error = null
        })
        builder.addCase(actionSearchBooks.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.payload || "cannot load books"
        })
        builder.addCase(actionSearchBooks.fulfilled, (state, action) => {
            state.status = "received"
            console.log(action.payload.data.data)
            state.books = action.payload.data.data
        })
        builder.addCase(actionFindMore.pending, (state) => {
            state.status = "loading"
            state.error = null
        })
        builder.addCase(actionFindMore.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.payload || "cannot load books"
        })
        builder.addCase(actionFindMore.fulfilled, (state, action) => {
            state.status = "received"
            state.books = [...state.books, ...action.payload.data.data]
        })
    }
})

export const {clearRecommendBooks} = recommendListSlice.actions
