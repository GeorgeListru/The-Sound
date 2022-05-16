import React from 'react';
import {useSelector} from "react-redux";
import {get_user_profile_config} from "../../requests/Configs";
import axios from 'axios'

function CreatePlaylist(props) {
    const localUserData = useSelector((state) => state.login);

    function SavePlaylistHandler(e) {
        e.preventDefault()
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;

        async function SavePlaylistRequest() {
            const config = get_user_profile_config(localUserData);
            const body = {
                title, description
            }
            return axios.post('/add-playlist', body, config)
        }

        SavePlaylistRequest().then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })

    }

    return (
        <div>
            <form
                onSubmit={SavePlaylistHandler}
                className={'mx-auto w-2/4 flex flex-col mt-16 text-custom-blue-400'}>
                <label className={'mx-auto uppercase font-semibold text-xl'} htmlFor={"title"}>Enter a Title</label>
                <input
                    name={'title'}
                    required
                    className={'mt-2 h-10 px-4 outline-none bg-custom-blue-100 text-xl focus:bg-custom-blue-200 transition-colors duration-150 ease-in-out'}
                    id={'title'}/>
                <div className={'flex mt-2'}>
                    <textarea placeholder={'Description (Optional)'}
                              name={'description'}
                              maxLength={256}
                              className={'grow bg-custom-blue-100 outline-none resize-none p-2 text-lg mr-2 h-32'}>
                    </textarea>
                    <button
                        className={'text-custom-blue-400 font-medium uppercase hover:bg-custom-blue-100 px-8 py-1 text-lg  ml-auto w-fit ' +
                            'transition-colors ease-in-out duration-150 h-fit'}>
                        Create Playlist
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePlaylist;