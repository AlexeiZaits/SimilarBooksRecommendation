import { createSlice } from "@reduxjs/toolkit";
import { ErrorType, Status } from "shared/types";
import { IBook } from "shared/types/book";
import { actionFindMore, actionGetBooks, actionSearchBooks } from "./recommend-list-actions";

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

const messageError = "Произошла ошибка в получение данных";

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
            state.error = action.payload || messageError
        })
        builder.addCase(actionSearchBooks.fulfilled, (state, action) => {
            if (action.payload.status === 1001){
                state.status = "rejected";
                state.error = messageError
            } else {
                state.status = "received"
                state.books = action.payload.data
            }
        })
        builder.addCase(actionFindMore.pending, (state) => {
            state.status = "loading"
            state.error = null
        })
        builder.addCase(actionFindMore.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.payload || messageError
        })
        builder.addCase(actionFindMore.fulfilled, (state, action) => {
            state.status = "received"
            state.books = [...state.books, ...action.payload.data]
        })
        builder.addCase(actionGetBooks.pending, (state) => {
            state.status = "loading"
            state.error = null
        })
        builder.addCase(actionGetBooks.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.payload || messageError
        })
        builder.addCase(actionGetBooks.fulfilled, (state, action) => {
            if (action.payload.status === 1006){
                state.status = "rejected";
                state.error = messageError
            } else {
                state.status = "received"
                state.books = action.payload.data
            }
        })
    }
})

export const {clearRecommendBooks} = recommendListSlice.actions
