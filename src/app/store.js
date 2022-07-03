import { configureStore } from '@reduxjs/toolkit';
import CaseReducer from '../features/Car/carSlice';

export const store = configureStore({
  reducer: {
    car: CaseReducer
  },
});
