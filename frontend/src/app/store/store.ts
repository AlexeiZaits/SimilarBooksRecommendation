import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { authSlice } from 'features/authorization/model/auth-slice';
import * as api from "../../config"
import { recommendListSlice } from 'features/recommendList/model/recommend-list-slice';
import { searchSlice } from 'features/search/model/search-slice';
import { infinityScrollSlice } from 'features/infinityScroll/model/infinity-scroll-slice';

export const store = configureStore({
  reducer: {
    authorization: authSlice.reducer,
    recommendList: recommendListSlice.reducer,
    searchRecommend: searchSlice.reducer,
    infinityScroll: infinityScrollSlice.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: {
        client: axios,
        api,
      },
    },
    serializableCheck: false,
  })
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch: () => AppDispatch = useDispatch;
