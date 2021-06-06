import { configureStore } from '@reduxjs/toolkit';
import carReducer from '../features/car/carsSlice';

export default configureStore({
  reducer: {
    carChanged: carReducer,
    ticketChanged: carReducer,
    actionsChanged: carReducer,
  },
});
