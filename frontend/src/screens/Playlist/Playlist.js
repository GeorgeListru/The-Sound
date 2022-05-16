import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { get_user_profile_config } from "../../requests/Configs";
import { setPlaylist } from "../../redux/CurrentPlaylistSlice";
import ReturnArtistsList from "../../functions/ReturnArtistsList";

function Playlist(props) {
  const { id } = useParams();
  const localUserData = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const PlaylistData = useSelector((state) => state.currentPlaylist);
  const [suggestedSongs, setSuggestedSongs] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  useEffect(() => {
    const config = get_user_profile_config(localUserData);
    axios.get("/get-playlist/" + id, config).then(({ data }) => {
      dispatch(setPlaylist(data));
    });
    axios.get("/explore", config).then(({ data }) => {
      setSuggestedSongs(data);
    });
    axios.get("/get-playlist-songs/" + id, config).then(({ data }) => {
      console.log(data);
    });
  }, []);

  function SetSongHandler() {}

  function AddSongToPlaylistHandler(song_id) {
    const config = get_user_profile_config(localUserData);
    const data = { song_id, playlist_id: id };
    axios.post("/add-song-to-playlist", data, config).then(({ data }) => {
      console.log(data);
    });
  }

  return (
    <div>
      <div
        className={
          "mx-auto w-fit mt-14 font-semibold text-custom-blue-400 text-3xl"
        }
      >
        {PlaylistData.title}
      </div>
      <div
        className={
          "mx-auto w-fit my-2 text-custom-blue-400 text-base font-medium"
        }
      >
        {PlaylistData.duration}
      </div>
      <div
        className={
          "w-[85%] mt-4 bg-custom-blue-100 mx-auto grid grid-cols-12 font-medium text-custom-blue-400 text-base px-2"
        }
      >
        <div className={""}>#</div>
        <div className={"col-span-3"}>Title</div>
        <div className={"col-span-4"}>Creator</div>
        <div className={"col-span-2"}>Date Added</div>
        <div className={"col-span-1"}>
          <i className="fa-regular fa-clock" />
        </div>
        <div className={"text-right"}>
          <i className="fa-solid fa-filter" />
        </div>
      </div>
      <div
        className={
          "w-[75%] mx-auto text-center uppercase mt-8 text-custom-blue-400 font-medium"
        }
      >
        Recommended
      </div>
      <div
        className={
          "w-[75%] mt-1 bg-custom-blue-100 mx-auto grid grid-cols-12 font-medium text-custom-blue-400 text-base px-2"
        }
      >
        <div className={"col-span-1"} />
        <div className={"col-span-4"}>Title</div>
        <div className={"col-span-5"}>Creator</div>
        <div className={"col-span-2"} />
      </div>
      {suggestedSongs.map((song) => {
        return (
          <div
            className={
              "w-[75%] py-3 bg-custom-blue-100 mx-auto grid grid-cols-12 font-medium text-custom-blue-400 text-base px-2"
            }
          >
            <div className={"col-span-1"}>
              <i
                className="fa-solid fa-play w-fit mx-auto flex mt-[0.15rem]"
                onClick={SetSongHandler}
              />
            </div>
            <div className={"col-span-4"}>{song.name}</div>
            <div className={"col-span-5"}>{ReturnArtistsList(song.artist)}</div>
            <div className={"col-span-2"}>
              <i
                className="fa-solid fa-plus font-black ml-auto flex w-fit mr-2 cursor-pointer"
                onClick={() => {
                  AddSongToPlaylistHandler(song.id);
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Playlist;
