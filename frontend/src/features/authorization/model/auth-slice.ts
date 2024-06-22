import { createSlice } from "@reduxjs/toolkit";
import {IUser} from "shared/types";
import { ErrorType, Status } from "shared/types/status";
import { authUser, logoutUser, refreshUser } from "./auth-actions";

export interface IAuthSlice{
  status: Status,
  error: ErrorType,
  user: IUser|null,
  isAuth: boolean
}

export const initialState:IAuthSlice = {
  status: "idle",
  error: null,
  user: null,
  isAuth: false
}

export const authSlice = createSlice({
    name: "@authSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(authUser.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(authUser.rejected, (state, action) => {
          state.status = 'rejected';
          state.error = action.payload || 'Cannot load data';
        })
        .addCase(authUser.fulfilled, (state, {payload}) => {
          localStorage.setItem("token", payload.data.accessToken)
          state.status = 'received';
          state.user = payload.data.user;
          state.isAuth = true;
        })
        .addCase(refreshUser.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(refreshUser.rejected, (state, action) => {
          state.status = 'rejected';
          state.error = action.payload || 'Cannot load data';
        })
        .addCase(refreshUser.fulfilled, (state, {payload}) => {
          localStorage.setItem("token", payload.data.accessToken)
          state.status = 'received';
          state.user = payload.data.user;
          state.isAuth = true;
        })
        .addCase(logoutUser.fulfilled, (state,) => {
          localStorage.removeItem("token")
          state.isAuth = false;
          state.user = null;
        })
    }
})