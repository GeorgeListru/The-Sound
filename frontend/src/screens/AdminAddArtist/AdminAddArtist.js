import React, { useState } from "react";
import Header from "../../components/Header";
import Label from "../../components/Label";
import Input from "../../components/Input";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AdminCurrentPage from "../../components/AdminCurrentPage";
import { useLocation, useNavigate } from "react-router";
import { AdminPageVariants } from "../../animations/AdminPageVariants";
import { get_user_profile_config } from "../../requests/Configs";
import { useSelector } from "react-redux";
import axios from "axios";

function AdminAddArtist(props) {
  const localUserData = useSelector((state) => state.login);
  const location = useLocation();
  const navigate = useNavigate();

  function onSubmitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const artist_name = form["Artist Name"].value;

    async function AddArtistRequest() {
      const config = get_user_profile_config(localUserData);
      const data = { artist_name };
      return axios.post("/add-artist", data, config);
    }

    AddArtistRequest()
      .then((response) => {
        navigate(location.pathname);
      })
      .catch((e) => {});
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
            <Label name={"Artist Name"} />
            <Input
              name={"Artist Name"}
              placeholder={"Enter a name"}
              type={"text"}
            />
          </div>
          <div className={"text-center"}>
            <Button customClasses={"px-14 py-1 text-xl mx-auto mt-2 uppercase"}>
              Add Artist
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}

export default AdminAddArtist;
