import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import filterReducer from '../features/filterSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer
  },
});
