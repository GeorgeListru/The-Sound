import {configureStore} from "@reduxjs/toolkit";
import LoginReducer from "./LoginDataSlice";
import PlayingSongReducer from "./PlayingSongSlice";
import CurrentPlaylistReducer from './CurrentPlaylistSlice'

export const store = configureStore({
    reducer: {
        login: LoginReducer,
        playingSong: PlayingSongReducer,
        currentPlaylist: CurrentPlaylistReducer
    },
});
