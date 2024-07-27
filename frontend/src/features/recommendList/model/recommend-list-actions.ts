import { createAsyncThunk } from "@reduxjs/toolkit";
import { BooksResponse, Extra } from "shared/types";
import axios from "axios";

export const actionSearchBooks = createAsyncThunk<
    BooksResponse,
    string,
{
    extra: Extra,
    rejectValue: string,
}
>(
    '@@recommendListSlice/search',
    async(search,
        { extra: {api}, rejectWithValue,
    }) => {
        try {
            return axios.post(api.searchBooks, {
              "book_desc": search,
              "n_chunks": 6,
              "offset": 0,
              "collection_name": "SimilarBooksService"
            });
          } catch (error) {
            if (error instanceof Error)
              return rejectWithValue(error.message);
            return rejectWithValue('Unknown error');
          }
    }
);
