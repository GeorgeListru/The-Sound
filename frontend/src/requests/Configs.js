export function get_user_profile_config(localUserData) {
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localUserData.token,
        },
    };
}

export function upload_music_file(localUserData) {
    return {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localUserData.token,
        },
    };
}

export function get_user_profile_config_file(localUserData) {
    return {
        responseType: "arraybuffer",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localUserData.token,
        },
    };
}
