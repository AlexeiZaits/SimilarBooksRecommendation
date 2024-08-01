import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Extra, TitlesResponse } from "shared/types";
import { TitlesRequest } from "shared/types/request";

export const actionGetTitles = createAsyncThunk<
    TitlesResponse,
    TitlesRequest,
{
    extra: Extra,
    rejectValue: string
}
>(
    'recommendSearchSlice/getTitles',
    async(query: TitlesRequest, {extra: {api}, rejectWithValue}) => {
        try {
            return axios.post(api.get_titles_books, query)
        } catch (error) {
            if (error instanceof Error)
                return rejectWithValue(error.message);
            return rejectWithValue('Unknown error');
        }
    }
)
