import { createSlice } from "@reduxjs/toolkit";
import { IBook } from "shared/types/book";

export interface IInitialState {
    books: IBook[],
}

export const initialState: IInitialState = {
    books: []
}

export const likeListSlice = createSlice({
    name: "@LikeListSlice",
    initialState: initialState,
    reducers: {
        toggleBookLike: (state, action) => {
            const {book, like} = action.payload
            if (state.books.length === 0) {
                state.books.push(book)
                !like && localStorage.setItem(`likesBook`, JSON.stringify([book]))
            } else {
                if (!like) {
                    state.books.push(book)
                    localStorage.setItem(`likesBook`, JSON.stringify([...JSON.parse(localStorage.getItem(`likesBook`) || "[]"), book]))
                }
                else {
                    state.books = state.books.filter((item) => item.uid !== book.uid)
                    localStorage.setItem('likesBook',
                        JSON.stringify(
                            JSON.parse(
                                localStorage.getItem(`likesBook`) || "[]")
                                .filter((item : IBook) => item.uid !== book.uid)))
                }
            }
        },
        setBooksLike: (state, action) => {
            state.books = action.payload
        },
        clearBooksLike: () => initialState
    }
})

export const {clearBooksLike, toggleBookLike, setBooksLike} = likeListSlice.actions
