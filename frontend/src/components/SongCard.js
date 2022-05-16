import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { set, pauseSong } from "../redux/PlayingSongSlice";
import ReturnArtistsList from "../functions/ReturnArtistsList";

function SongCard({ song }) {
  const playingSong = useSelector((state) => state.playingSong);
  const dispatch = useDispatch();

  function SetSongHandler() {
    dispatch(set(song));
  }

  function setSongPause() {
    dispatch(pauseSong());
  }

  return (
    <div className={"song-card"}>
      <div onClick={SetSongHandler}>
        {song.name} - {ReturnArtistsList(song.artist)}
      </div>
      <div>
        {song.id === playingSong.id && playingSong.playing === true ? (
          <i className="fa-solid fa-pause" onClick={setSongPause}></i>
        ) : (
          <i className="fa-solid fa-play" onClick={SetSongHandler} />
        )}
      </div>
    </div>
  );
}

export default SongCard;
