import React, { useState, useRef } from "react";
import Header from "../../components/Header";
import Label from "../../components/Label";
import Input from "../../components/Input";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  get_user_profile_config,
  upload_music_file,
} from "../../requests/Configs";
import { useSelector } from "react-redux";
import axios from "axios";
import AdminCurrentPage from "../../components/AdminCurrentPage";
import { useLocation, useNavigate } from "react-router";
import { AdminPageVariants } from "../../animations/AdminPageVariants";

function AdminSongUpload(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const localUserData = useSelector((state) => state.login);
  const [artistNameInput, setArtistNameInput] = useState("");
  const [fileName, setFileName] = useState("");
  const [artistsList, setArtistsList] = useState([]);
  const [selectedArtistList, setSelectedArtistList] = useState([]);

  function onSubmitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const song_name = form["Song Name"].value;
    const file = form["song-file"].files[0];

    let formData = new FormData();
    formData.append("file", file);
    formData.append("song_name", song_name);
    const artistIDs = selectedArtistList.map((artist) => artist.id);
    formData.append("artists", artistIDs.toString());

    async function UploadSongRequest() {
      const config = upload_music_file(localUserData);
      try {
        const response = await axios.post("/upload-song", formData, config);
        navigate(location.pathname);
      } catch (e) {}
    }

    UploadSongRequest();
  }

  function SetFileNameHandler(e) {
    const file = e.target.files[0];
    const filename = file.name.trim();
    setFileName(filename.slice(0, 20));
  }

  function setArtistName(e) {
    setArtistNameInput(e.target.value);

    function getArtistsRequest() {
      const config = get_user_profile_config(localUserData);
      return axios.get("/get-artists/" + e.target.value, config);
    }

    getArtistsRequest()
      .then((response) => {
        setArtistsList(response.data);
      })
      .catch((e) => {
        setArtistsList([]);
      });
  }

  function AddArtistToListHandler(artist) {
    setArtistNameInput("");
    setArtistsList([]);
    if (
      selectedArtistList.filter(
        (selectedArtist) => selectedArtist.artist === artist.artist
      ).length > 0
    )
      return;
    setSelectedArtistList([...selectedArtistList, artist]);
  }

  function DeleteSelectedArtistHandler(artist) {
    setSelectedArtistList(
      selectedArtistList.filter(
        (selectedArtist) => selectedArtist.artist !== artist.artist
      )
    );
  }

  return (
    <div>
      <div
        className={
          "bg-custom-blue-300 h-screen w-1/2 mx-auto flex flex-col relative"
        }
      >
        <Header>ADMIN</Header>
        <AdminCurrentPage current={location.pathname} />
        <motion.form
          variants={AdminPageVariants}
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
          onSubmit={onSubmitHandler}
          className={"w-1/2 h-100 mx-auto mt-8 grid grid-cols-1 gap-4"}
        >
          <div>
            <Label name={"Song Name"} />
            <Input
              name={"Song Name"}
              placeholder={"Enter a song name"}
              type={"text"}
            />
          </div>
          <div>
            <Label name={"Artist Name"} />
            <Input
              onChangeEvent={setArtistName}
              name={"Search"}
              placeholder={"Enter the name of the artist"}
              type={"text"}
              required={false}
              value={artistNameInput}
            />
            {artistsList.length > 0 && (
              <div className={"absolute w-1/2 bg-custom-blue-200 z-10"}>
                {artistsList.map((artist) => {
                  return (
                    <div
                      onClick={() => AddArtistToListHandler(artist)}
                      className={
                        "cursor-pointer w-full hover:bg-custom-blue-100 transition-colors duration-150 ease-in-out"
                      }
                    >
                      {artist.artist}
                    </div>
                  );
                })}
              </div>
            )}
            <div className={"flex relative mt-2"}>
              {selectedArtistList.map((selectedArtist) => {
                return (
                  <div className={"mr-2 bg-custom-blue-200 px-2"}>
                    {selectedArtist.artist}{" "}
                    <i
                      onClick={() =>
                        DeleteSelectedArtistHandler(selectedArtist)
                      }
                      className="fa-solid fa-x text-xs my-auto cursor-pointer hover:text-custom-blue-300 transition-colors duration-150 ease-in-out"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={"w-full mt-2 flex justify-between"}>
            <label
              htmlFor={"song-file"}
              className={
                "text-center uppercase text-white cursor-pointer hover:bg-custom-blue-200 " +
                "hover:text-custom-blue-300 py-2 px-4 transition-color duration-200 linear font-semibold"
              }
            >
              Drop a file
            </label>
            {fileName.length > 0 && (
              <label
                className={"text-white text-lg my-auto"}
              >{`${fileName}`}</label>
            )}
            <input
              onChange={SetFileNameHandler}
              id={"song-file"}
              name={"song-file"}
              type={"file"}
              className={"hidden"}
            />
          </div>
          <div className={"text-center"}>
            <Button customClasses={"px-14 py-1 text-xl mx-auto mt-2 uppercase"}>
              Upload song
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}

export default AdminSongUpload;
