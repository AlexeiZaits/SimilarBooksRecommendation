import { createAsyncThunk } from "@reduxjs/toolkit";
import { Extra } from "shared/types";
import $client from "shared/api";
import { IBook } from "shared/types/book";

export const actionSearchBooks = createAsyncThunk<
    Omit<IBook, "description">[],
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
            return $client.post(api.searchBooks(search));
          } catch (error) {
            if (error instanceof Error)
              return rejectWithValue(error.message);
            return rejectWithValue('Unknown error');
          }
    }
);