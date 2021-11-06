import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import hotelReducer from '../features/hotelBooking/hotelSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    hotelBooking: hotelReducer,
  },
});
