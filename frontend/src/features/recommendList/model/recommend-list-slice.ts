import { createSlice } from "@reduxjs/toolkit";
import { ErrorType, Status } from "shared/types";
import { IBook } from "shared/types/book";
import { actionSearchBooks } from "./recommend-list-actions";

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
    reducers: {},
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
            console.log(action.payload.data)
            state.books = action.payload.data.data
        })
    }
})
