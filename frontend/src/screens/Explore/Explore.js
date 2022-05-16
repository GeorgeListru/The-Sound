import React, {useEffect, useState} from "react";
import {get_user_profile_config} from "../../requests/Configs";
import axios from "axios";
import {useSelector} from "react-redux";
import SongCard from "../../components/SongCard";

function Explore(props) {
    const localUserData = useSelector((state) => state.login);
    const [songsList, setSongsList] = useState([]);
    useEffect(() => {
        const config = get_user_profile_config(localUserData);
        axios.get("/explore", config).then((response) => {
            setSongsList(response.data);
        });
        return () => {
            setSongsList([]);
        };
    }, []);

    return (
        <div className={"w-[95%] mx-auto flex flex-col"}>
            <div>
                <h2 className={"section-header"}>Recommended</h2>
                <div className={"flex justify-between"}>
                    {songsList.map((song) => {
                        return <SongCard song={song}/>;
                    })}
                </div>
            </div>
        </div>
    );
}

export default Explore;
