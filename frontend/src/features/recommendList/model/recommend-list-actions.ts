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
            const data = await client.get(api.searchBooks(searchRequest.query, searchRequest.limit, searchRequest.offset));

            return data.data

          } catch (error) {
            if (error instanceof Error)
              return rejectWithValue(error.message);
            return rejectWithValue('Unknown error');
        }
    }
);

export interface IActioFindMore extends BooksRequest {
    category?: string
}

export const actionFindMore = createAsyncThunk<
    BooksResponse,
    IActioFindMore,
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
            let data
            if (searchRequest.category){
                data = await axios.get(api.get_books(searchRequest.offset, searchRequest.limit, searchRequest.query === "all" ? null: searchRequest.query));
            } else{
                data = await axios.get(api.searchBooks(searchRequest.query, searchRequest.limit, searchRequest.offset));
            }
            return data.data

          } catch (error) {
            if (error instanceof Error)
              return rejectWithValue(error.message);
            return rejectWithValue('Unknown error');
          }
    }
);

export const actionGetBooks = createAsyncThunk<
    BooksResponse,
    BooksRequest,
{
    extra: Extra,
    rejectValue: string,
}
>(
    '@@recommendListSlice/getBooks',
    async(searchRequest,
        { extra: {api}, rejectWithValue,
    }) => {
        try {
            const data = await axios.get(api.get_books(searchRequest.offset, searchRequest.limit, searchRequest.query === "all"? null: searchRequest.query));
            return data.data

          } catch (error) {
            if (error instanceof Error)
              return rejectWithValue(error.message);
            return rejectWithValue('Unknown error');
          }
    }
);
