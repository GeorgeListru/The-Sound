import {createSlice} from "@reduxjs/toolkit";

const initialState = {};

export const PlayingSongSlice = createSlice({
    name: "playingSong",
    initialState,
    reducers: {
        set: (state, action) => {
            return {...action.payload, playing: true};
        },

        playSong: (state) => {
            state.playing = true;
        },
        pauseSong: (state) => {
            state.playing = false;
            return state;
        },
        clear: (state) => {
            return {};
        },
    },
});

export const {set, clear, pauseSong, playSong} = PlayingSongSlice.actions;

export default PlayingSongSlice.reducer;
