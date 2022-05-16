import React, {useEffect, useState} from "react";
import {Link, Routes, Route} from "react-router-dom";
import {Outlet} from "react-router";
import Explore from "../Explore/Explore";
import Input from "../../components/Input";
import "./Player.css";
import {get_user_profile_config} from "../../requests/Configs";
import {useSelector} from "react-redux";
import axios from "axios";
import PlayerController from "../../components/PlayerController";
import IsObjectEmpty from "../../functions/IsObjectEmpty";

function Player() {
    const localUserData = useSelector((state) => state.login);
    const PlayingSong = useSelector((state) => state.playingSong);
    const [responseUserData, setResponseUserData] = useState({});
    const [profileDropdownStatus, setProfileDropdownStatus] = useState("");
    const [profileArrowStatus, setProfileArrowStatus] = useState("");
    const [Playlists, setPlaylists] = useState([])

    useEffect(() => {
        const config = get_user_profile_config(localUserData);
        axios.get("/profile", config).then(({data}) => {
            setResponseUserData(data);
        });

        document.addEventListener("click", (e) => {
            if (e.target.closest("[data-dropdown]") == null) {
                setProfileDropdownStatus("");
                setProfileArrowStatus("");
            }
        });
    }, []);
    useEffect(() => {
        const config = get_user_profile_config(localUserData);
        axios.get('/get-playlists', config).then(({data}) => {
            setPlaylists(data)
        })
    }, []);


    function onProfileClickHandler(e) {
        if (profileDropdownStatus.length > 0) {
            setProfileDropdownStatus("");
            setProfileArrowStatus("");
            return;
        }
        if (e.target.closest("[data-dropdown]") != null) {
            setProfileDropdownStatus("profile-dropdown-menu-active");
            setProfileArrowStatus("profile-arrow-active");
        }
    }

    return (
        <div className={"flex"}>
            <div className={"h-screen w-[15%] relative left-0 bg-custom-blue-300"}>
                <div
                    className={
                        "grid grid-rows-3 gap-3 text-xl font-semibold text-white pt-12 w-full"
                    }
                >
                    <Link
                        to={`/player/explore`}
                        className="ml-6 hover:text-custom-blue-100 transition-colors duration-200 w-fit"
                    >
                        <i className="fa-solid fa-compass"/> Explore
                    </Link>
                    <Link
                        to={"/player/library"}
                        className="ml-6 hover:text-custom-blue-100 transition-colors duration-200 w-fit"
                    >
                        <i className="fa-solid fa-house"/> Your Library
                    </Link>
                    <Link
                        to={"/player/liked"}
                        className="ml-6 hover:text-custom-blue-100 transition-colors duration-200"
                    >
                        <i className="fa-solid fa-heart"/> Liked Songs
                    </Link>
                    <div className={'mt-4 text-custom-blue-200 text-lg mx-6'}>
                        {Playlists.length > 0 && Playlists.map(playlist => {
                            return <Link key={playlist.id} to={'playlist/' + playlist.id}
                                         className={'font-normal hover:text-custom-blue-100 transition-colors ease-in-out duration-100'}>{playlist.title}</Link>
                        })}
                        <Link className={'text-center  '} to={'/player/create-playlist'}>
                            <div
                                className={'hover:bg-custom-blue-350 transition-colors ease-in-out duration-150  mx-auto font-medium'}>+
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={"w-[85%]"}>
                <div className={"w-full h-14 bg-custom-blue-300 grid grid-cols-2"}>
                    <form className={"w-1/2 my-auto"}>
                        <Input
                            name={"Search"}
                            placeholder={"Search a song"}
                            type={"text"}
                        />
                    </form>
                    <div
                        id="dropdownButton"
                        data-dropdown-toggle="dropdown"
                        className={
                            "my-auto ml-auto mr-16 text-custom-blue-100 font-semibold  " +
                            "cursor-pointer hover:bg-custom-blue-350 transition-colors duration-200"
                        }
                    >
                        <div className="profile-dropdown" data-dropdown>
                            <a
                                href="#"
                                className="Control-Link text-xl px-4 py-2 rounded-xl"
                                onClick={onProfileClickHandler}
                            >
                                {responseUserData.email + " "}
                                <i
                                    className={`font-black fas fa-chevron-right profile-arrow ${profileArrowStatus}`}
                                />
                            </a>
                            <div
                                className={`bg-custom-blue-300 profile-dropdown-menu ${profileDropdownStatus}`}
                            >
                                <Link
                                    to="profile"
                                    className="profile-dropdown-item text-custom-blue-100 hover:bg-custom-blue-350"
                                >
                                    Profile
                                </Link>
                                <hr className={"bg-custom-blue-100 border-custom-blue-100"}/>
                                <div
                                    className="profile-dropdown-item hover:bg-custom-blue-350 transition-colors duration-200 ease-in-out">
                                    Logout
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"h-full flex flex-col justify-between"}>
                    <Outlet/>
                    {!IsObjectEmpty(PlayingSong) && (
                        <PlayerController song={PlayingSong}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Player;
