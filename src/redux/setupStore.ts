import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import housesApiReducer, { housesApi } from 'src/redux/api/housesApi';

export const setupStore = () =>
  configureStore({
    reducer: {
      [housesApi.reducerPath]: housesApiReducer,
    },
    middleware: (gDM) => gDM().concat(housesApi.middleware),
  });

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const store = setupStore();

export const wrapper = createWrapper<AppStore>(setupStore);
