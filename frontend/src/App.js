import "./App.css";
import {Routes, Route, useLocation, Navigate} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import Landing from "./screens/Landing/Landing";
import Register from "./screens/Register/Register";
import Login from "./screens/Login/Login";
import Player from "./screens/Player/Player";
import AdminSongUpload from "./screens/AdminAddSong/AdminSongUpload";
import AdminAddArtist from "./screens/AdminAddArtist/AdminAddArtist";
import Explore from "./screens/Explore/Explore";
import CreatePlaylist from './screens/CreatePlaylist/CreatePlaylist'
import React from "react";
import Playlist from "./screens/Playlist/Playlist";

function App() {
    const location = useLocation();
    return (
        <div className="App bg-custom-blue-200 w-100 h-100 font-roboto">
            <AnimatePresence exitBeforeEnter initial={false}>
                <Routes location={location} key={location.key}>
                    <Route path="" exact element={<Landing/>}/>
                    <Route path="register" exact element={<Register/>}/>
                    <Route path="login" exact element={<Login/>}/>
                    <Route
                        path="player"
                        element={<Player/>}
                        render={() => <Navigate to="player/explore"/>}
                    >
                        <Route path={"explore"} element={<Explore/>}/>
                        <Route path={"create-playlist"} element={<CreatePlaylist/>}/>
                        <Route exact path={'playlist/:id'} element={<Playlist/>}/>
                    </Route>
                    <Route path={"admin/add-song"} exact element={<AdminSongUpload/>}/>
                    <Route path={"admin/add-artist"} exact element={<AdminAddArtist/>}/>
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default App;
