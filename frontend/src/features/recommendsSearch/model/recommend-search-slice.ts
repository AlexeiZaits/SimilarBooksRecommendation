import { createSlice } from "@reduxjs/toolkit";
import { actionGetTitles } from "./recommend-search-actions";
import { ErrorType, Status } from "shared/types";
import { getLocal, setLocal } from "../lib/setLocalTitle";

export interface titlesRecommend {
    type: "local" | "search",
    text: string
}

export interface IRecommendSearch{
    status: Status,
    error: ErrorType,
    titles: titlesRecommend[],
    focusElement: number|null,
    view: boolean,
}

const initialState: IRecommendSearch = {
    titles: [],
    error: null,
    status: "idle",
    focusElement: null,
    view: false,
}
//TODO: разделить локальные
export const recommendSearchSlice = createSlice({
    name: "@recommendSearchSlice",
    initialState: initialState,
    reducers: {
        incrementFocusElement: (state) => {
            if (state.focusElement === null || state.focusElement + 1 === state.titles.length){
                state.focusElement = 0
            }
            else{
                state.focusElement = state.focusElement + 1
            }
        },
        decrementFocusElement: (state) => {
            if (state.focusElement !== null && state.focusElement - 1 < 0){
                state.focusElement = state.titles.length-1
            }
            else if (state.focusElement){
                state.focusElement = state.focusElement - 1
            }
        },
        setTitlesRecommendSearch: (state, action) => {
            state.titles = [...action.payload, ...state.titles]
        },
        deleteTitleLocalRecommend: (state, action) => {
            console.log("delete")
            const filterTitles = state.titles.filter((item) => item.text !== action.payload.text || item.type !== "local" )
            const filterLocalTitles = filterTitles.filter((item) => item.type === "local")
            setLocal<titlesRecommend[]>("recommends",filterLocalTitles);
            state.titles = filterTitles;

        },
        setViewRecommendSearch: (state, action) => {
            state.titles = [...getLocal<titlesRecommend[]>("recommends") || [], ...state.titles.filter((item) => item.type === "search")]

            state.view = action.payload
        },
        clearFocusElementRecommendSearch: (state) => {
            state.focusElement = null
        },
        clearRecommendSearch: (state) => {
            return {
                ...initialState,
                titles: state.titles.filter((item) => item.type === "local")
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(actionGetTitles.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(actionGetTitles.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.payload || "error get titles"
        })
        builder.addCase(actionGetTitles.fulfilled, (state, action) => {
            if (action.payload.data.status === 1003){
                state.error = "error get titles"
            } else{
                state.error = null;
                state.status = "received";

                const filterTitles = state.titles.filter((item) => item.type !== "search")
                state.titles = [...filterTitles, ...action.payload.data.titles
                    .map((item) => {
                    return {text: item, type: action.payload.data.type}
                })]
            }
        })
    },
})

export const {
    clearRecommendSearch, incrementFocusElement,
    deleteTitleLocalRecommend,
    decrementFocusElement, setViewRecommendSearch,
    clearFocusElementRecommendSearch, setTitlesRecommendSearch,
    } = recommendSearchSlice.actions
