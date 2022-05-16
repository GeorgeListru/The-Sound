import {createSlice} from '@reduxjs/toolkit'

const initialState = {}

export const CurrentPlaylistSlice = createSlice({
    name: "currentPlaylist",
    initialState,
    reducers: {
        setPlaylist: (state, action) => {
            return action.payload
        },
        clearPlaylist: (state) => {
            return {}
        }
    }
})

export const {setPlaylist, clearPlaylist} = CurrentPlaylistSlice.actions
export default CurrentPlaylistSlice.reducer