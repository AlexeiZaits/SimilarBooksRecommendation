import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthResponse, Extra, IUserForm } from "shared/types";
import $client from "shared/api";

export const authUser = createAsyncThunk<
{ data: AuthResponse },
IUserForm,
{ 
  extra: Extra,
  rejectValue: string,
}
>
(  
    '@@authSlice/login',
    async (user, 
    { extra: {api}, rejectWithValue,
    }) => {
      try {
        return $client.post(api.authUser, user);
      } catch (error) {
        if (error instanceof Error)
          return rejectWithValue(error.message);
        return rejectWithValue('Unknown error');
      }
    },
);


export const logoutUser = createAsyncThunk<
undefined,
undefined,
{
  extra: Extra,
  rejectValue: string,
}
>(  
    '@@authSlice/logout',
    async (_, {
        extra: {api},
        rejectWithValue,
    }) => {
        try {
        return $client.post(api.logout);
        } catch (error) {
        if (error instanceof Error)
            return rejectWithValue(error.message);
        return rejectWithValue('Unknown error');
        }
    },
);


export const refreshUser = createAsyncThunk<
{ data: AuthResponse },
undefined,
{ 
  extra: Extra,
  rejectValue: string,
}
>
(  
    '@@authSlice/refresh',
    async (_, 
    { extra: {api}, rejectWithValue,
    }) => {
      try {
        return $client.post(api.resresh);
      } catch (error) {
        if (error instanceof Error)
          return rejectWithValue(error.message);
        return rejectWithValue('Unknown error');
      }
    },
);