import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthResponse, Extra, IUserForm, RegResponse } from "shared/types";
import $client from "shared/api";
import { AxiosError } from "axios";

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
        return $client.get(api.resresh);
      } catch (error) {
        if (error instanceof Error)
          return rejectWithValue(error.message);
        return rejectWithValue('Unknown error');
      }
    },
);

export const regUser = createAsyncThunk<
{ data: RegResponse },
IUserForm,
{
  extra: Extra,
  rejectValue: string,
}
>
(
    '@@authSlice/register',
    async (user,
    { extra: {api}, rejectWithValue,
    }) => {
      try {
        const response = await $client.post(api.regUser, user);
        console.log(response)
        return response
      } catch (error) {
        if (error instanceof AxiosError){
          return rejectWithValue(error.response?.data.detail);
        }
        return rejectWithValue('Unknown error');
      }
    },
);
