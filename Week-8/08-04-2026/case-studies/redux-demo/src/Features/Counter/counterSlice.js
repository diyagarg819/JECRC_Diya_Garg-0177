//creating a slice of the store for counter

import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    value: 0,
}

export const counterSlice  = createSlice({
    name: 'counter',
    initialState: intialState,  
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        }
    }
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;