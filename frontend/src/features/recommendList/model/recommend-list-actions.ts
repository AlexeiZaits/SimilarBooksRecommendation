import { createAsyncThunk } from "@reduxjs/toolkit";
import { BooksResponse, Extra } from "shared/types";
import axios from "axios";
import { BooksRequest } from "shared/types/request";

export const actionSearchBooks = createAsyncThunk<
    BooksResponse,
    BooksRequest,
{
    extra: Extra,
    rejectValue: string,
}
>(
    '@@recommendListSlice/search',
    async(searchRequest,
        { extra: {api, client}, rejectWithValue,
    }) => {
        try {
            return client.post(api.searchBooks, searchRequest);
          } catch (error) {
            if (error instanceof Error)
              return rejectWithValue(error.message);
            return rejectWithValue('Unknown error');
        }
    }
);

export const actionFindMore = createAsyncThunk<
    BooksResponse,
    BooksRequest,
{
    extra: Extra,
    rejectValue: string,
}
>(
    '@@recommendListSlice/findMore',
    async(searchRequest,
        { extra: {api}, rejectWithValue,
    }) => {
        try {
            return axios.post(api.searchBooks, searchRequest);
          } catch (error) {
            if (error instanceof Error)
              return rejectWithValue(error.message);
            return rejectWithValue('Unknown error');
          }
    }
);
