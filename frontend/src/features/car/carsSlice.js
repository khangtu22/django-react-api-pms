import {createSlice} from "@reduxjs/toolkit";
import { nanoid } from '@reduxjs/toolkit'

export const carsSlice = createSlice({
    name: 'action',
    initialState: {
        id: '0',
    },
    reducers: {
        update: (state, actions) => {
            state.id = nanoid();
        },
        create: state => {
            state.id = nanoid();
        },
        drop: state => {
            state.id = nanoid();
        },
    },
});

export const { update, create, drop, } = carsSlice.actions;
export const selectCar = state => state.carChanged.id;
export const selectTicket = state => state.ticketChanged.id;
export const selectAction = state => state.actionsChanged.id;

export default carsSlice.reducer;