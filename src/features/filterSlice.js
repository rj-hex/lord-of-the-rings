import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        search: (state, action) => {
            state["search"] = action.payload || "";
        },
        sort: (state, action) => {
            state["sort"] = action.payload || "";
        },
        race: (state, action) => {
            state["race"] = action.payload || "";
        },
        gender: (state, action) => {
            state["gender"] = action.payload || "";
        }
    }
});

export const { search, sort, race, gender } = filterSlice.actions;

export default filterSlice.reducer;