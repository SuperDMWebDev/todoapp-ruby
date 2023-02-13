import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from './epics';
import thunkMiddleware from 'redux-thunk';
const epicMiddleware = createEpicMiddleware();
export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
  devTools: process.env.NODE_ENV === 'development',
});
epicMiddleware.run(rootEpic);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
