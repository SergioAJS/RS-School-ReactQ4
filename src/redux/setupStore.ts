import housesApiReducer, { housesApi } from 'src/redux/api/housesApi';
import housesQuerySlice from 'src/redux/housesQuerySlice';
import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  [housesApi.reducerPath]: housesApiReducer,
  housesQuery: housesQuerySlice,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(housesApi.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
