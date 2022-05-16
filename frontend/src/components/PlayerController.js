import React, {useEffect, useState} from "react";
import axios from 'axios'
import {get_user_profile_config_file} from "../requests/Configs";
import {useSelector, useDispatch} from "react-redux";
import {playSong} from '../redux/PlayingSongSlice'
import {pauseSong} from '../redux/PlayingSongSlice'

const PlayerController = ({song}) => {
    const [playingSong, setPlayingSong] = useState(new Audio())
    const [pause, setPause] = useState(false)
    const [duration, setDuration] = useState(0)
    const localUserData = useSelector((state) => state.login);
    const [barLength, setBarLength] = useState(0);
    const [volume, setVolume] = useState(0.1)
    const dispatch = useDispatch()

    function PlaySong() {
        const config = get_user_profile_config_file(localUserData)

        function GetSongHandler() {
            return axios.get('/get-song/' + song.id, config)
        }

        GetSongHandler().then(response => {
            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
            const audio = new Audio(url);

            function durationSetter(e) {
                setDuration(e.target.duration);
            }

            function timeUpdateSetter(e) {
                setBarLength(e.target.currentTime);
                if (e.target.currentTime === duration) {
                    dispatch(pauseSong())
                }
            }


            audio.addEventListener('loadedmetadata', durationSetter);
            audio.addEventListener('timeupdate', timeUpdateSetter);
            audio.play()
            audio.volume = volume
            setPlayingSong(audio)
            return () => {
                audio.removeEventListener('loadedmetadata', durationSetter)
                audio.removeEventListener('timeupdate', timeUpdateSetter)

            }
        }).catch(e => {
            console.log(e)
        })
    }

    function setPlayingStatus() {
        if (playingSong.duration > 0 && !playingSong.paused) {
            dispatch(pauseSong())
            return
        }
        dispatch(playSong())
    }

    useEffect(() => {
        playingSong.pause()
        PlaySong()
    }, [song.id])

    useEffect(() => {
        if (song.playing === false) {
            setPause(true)
            playingSong.pause()
            return
        }
        playingSong.play()
        setPause(false)
    }, [song.playing]);


    useEffect(() => {
        setBarLength(playingSong.currentTime)

        function spaceKeyPressed(e) {
            if (e.keyCode === 32 && playingSong.duration > 0 && !playingSong.paused) {
                playingSong.pause();
                setPause(true)
                dispatch(pauseSong())
            } else if (e.keyCode === 32 && playingSong.paused) {
                playingSong.play();
                setPause(false)
                dispatch(playSong())
            }
        }

        window.addEventListener('keypress', spaceKeyPressed);
        return () => {
            window.removeEventListener('keypress', spaceKeyPressed)
        }
    }, [playingSong]);

    function setAudioPoint(e) {
        const point = e.target.value;
        playingSong.currentTime = point
        setBarLength(point)
    }

    function changeVolume(e) {
        const new_volume = e.target.value;
        playingSong.volume = new_volume
        setVolume(new_volume)
    }

    function secondsToTime(seconds) {
        const returnMinutes = Math.floor(seconds / 60)
        let returnSeconds = seconds % 60 ? Math.round(seconds % 60) : 0
        if (returnSeconds >= 0 && returnSeconds <= 9) {
            returnSeconds = "0" + returnSeconds
        }
        return returnMinutes + ":" + returnSeconds
    }

    return (
        <div className={"translate-y-[-65%] w-full bg-custom-blue-100 pb-3 px-8"}>
            <div className={'w-full flex justify-between text-sm font-medium'}>
                <span className={'pr-2'}>{secondsToTime(barLength)}</span>
                <input type="range" min="1" max={duration} step="0.1" value={barLength} className={
                    "timeline-slider w-full mt-1"
                } onChange={setAudioPoint}/>
                <span className={"pl-2"}>{secondsToTime(duration)}</span>
            </div>
            <div className={"grid grid-cols-3"}>
                <div className={"flex flex-col text-custom-blue-400"}>
                    <div className={"font-bold text-lg"}>{song.name}</div>
                    <div className={"text-sm font-medium"}>
                        {song.artist.map((artist) => {
                            if (
                                song.artist.length > 1 &&
                                song.artist.indexOf(artist) !== song.artist.length - 1
                            )
                                return artist.artist + ", ";
                            return artist.artist;
                        })}
                    </div>
                </div>
                <div className={"flex mx-auto text-custom-blue-300 my-auto space-x-1"}>
                    <span className="material-icons-round scale-x-[-1] cursor-pointer text-4xl">
                      fast_forward
                    </span>
                    <span className="material-icons-outlined cursor-pointer text-4xl" onClick={setPlayingStatus}>
                      {pause ? "play_circle_filled" : "pause_circle"}
                    </span>
                    <span className="material-icons-round cursor-pointer text-4xl">
                      fast_forward
                    </span>
                </div>

                <div className={"text-custom-blue-400 text-lg my-auto flex ml-auto"}>

                    {/*<span className="material-icons-outlined mr-4 cursor-pointer"*/}
                    {/*      id="dropdownTopButton" data-dropdown-toggle="dropdownTop" data-dropdown-placement="top"*/}
                    {/*>*/}
                    {/*  playlist_add*/}
                    {/*</span>*/}
                    <div className="flex justify-center">
                        <div>
                            <div className="dropup relative">
                                <button
                                    className="
          dropdown-toggle
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap
        "
                                    type="button"
                                    id="dropdownMenuButton1u"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Dropup
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="caret-up"
                                        className="w-2 ml-2"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"
                                        ></path>
                                    </svg>
                                </button>
                                <ul
                                    className="
          dropdown-menu
          min-w-max
          absolute
          hidden
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          hidden
          m-0
          bg-clip-padding
          border-none
        "
                                    aria-labelledby="dropdownMenuButton1u"
                                >
                                    <li>
                                        <a
                                            className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                                            href="#"
                                        >Action</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                                            href="#"
                                        >Another action</a
                                        >
                                    </li>
                                    <li>
                                        <a
                                            className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                                            href="#"
                                        >Something else here</a
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <i className="fa-regular fa-heart cursor-pointer mr-4"/>
                    <input type={'range'} className={'w-24'} value={volume} max='1' min={'0'} step={0.01}
                           onChange={changeVolume}/>
                </div>
            </div>
        </div>
    );
};

export default PlayerController;
