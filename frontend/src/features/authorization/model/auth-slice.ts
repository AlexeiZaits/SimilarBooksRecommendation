import { createSlice } from "@reduxjs/toolkit";
import {IUser} from "shared/types";
import { ErrorType, Status } from "shared/types/status";
import { authUser, logoutUser, refreshUser, regUser } from "./auth-actions";

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
    reducers: {
      clearErrorAuth: (state) => {
        state.error = null
      }
    },
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
          localStorage.setItem("token", payload.data.access_token)
          state.status = 'received';
          // state.user = payload.data.user;
          state.isAuth = true;
        })
        .addCase(refreshUser.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(refreshUser.rejected, (state, action) => {
          state.status = 'rejected';
          console.log(action.payload || "error in resresh user")
        })
        .addCase(refreshUser.fulfilled, (state, {payload}) => {
          localStorage.setItem("token", payload.data.access_token)
          state.status = 'received';
          state.user = payload.data.user;
          state.isAuth = true;
        })
        .addCase(logoutUser.fulfilled, (state,) => {
          localStorage.removeItem("token")
          state.isAuth = false;
          state.user = null;
        })
        .addCase(regUser.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(regUser.rejected, (state, action) => {
          state.status = 'rejected';
          state.error = action.payload || 'Cannot load data';
        })
        .addCase(regUser.fulfilled, (state, {payload}) => {
          console.log(payload.data.message)
          state.status = 'received';
        })
    }
})

export const {clearErrorAuth} =  authSlice.actions
