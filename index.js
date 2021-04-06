//#region Spotify API authentication
const required_scopes = "playlist-read-private playlist-read-collaborative";
const client_id = "868b6e0f774c472d82295366ec6d7baa";
const redirect_uri = location.origin + location.pathname;
window.spotify_login_url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&scope=${encodeURIComponent(
    required_scopes
)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;

// get the token from local storage and make it available everywhere
window.token = localStorage.getItem("spotify-token");

// logout function
window.logout = function () {
    localStorage.clear();
    location.replace("/");
};
//#endregion

//#region ui logic

window.handleSpotifyPlaylistURI = function ($event) {
    const SPOTIFY_URI_REGEX = /^[0-9A-Za-z_-]+$/;
    let uri = $event.target.value.replace(/spotify:playlist:/, "");
    if (SPOTIFY_URI_REGEX.test(uri)) {
        location.hash = uri;
    } else {
        alert("Invalid URI");
        $event.target.value = null;
    }
    $event.target.blur();
};
//#endregion

//#region Spotify API calls

const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${window.token}`,
    "Content-Type": "application/json",
};

function fetchApi(url) {
    return fetch(url, { headers })
        .then((resp) => resp.json())
        .then((res) => {
            if (!res.error) {
                return res;
            }
            if (
                res.error.message == "Invalid access token" ||
                res.error.message == "The access token expired"
            ) {
                window.logout();
            }
            throw res.error;
        });
}

function fetchPlaylists() {
    return fetchApi("https://api.spotify.com/v1/me/playlists").then((playlist) => playlist.items);
}

function fetchPlaylist(id) {
    if (id == null) {
        return Promise.resolve(null);
    }
    return fetchApi(
        `https://api.spotify.com/v1/playlists/${id}?fields=${encodeURIComponent(
            "id,images,external_urls.spotify,description,name,tracks(items(track(type,name,external_urls.spotify,preview_url,album.images,artists(name,external_urls.spotify))))"
        )}`
    ).then((playlist) => {
        // drop all tracks without a preview url
        playlist.tracks.items = playlist.tracks.items.filter(
            (item) => item.track.preview_url != null
        );
        // shuffle the tracks
        shuffle(playlist.tracks.items);
        return playlist;
    })
}
//#endregion

//#region utils
// helper function to randomize the order of elements of an array inplace
function shuffle(a) {
    for (let i = a.length - 1; i > a.length / 2 - 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// helper function to call a referenced function before passing on its reference
function called_already(f) {
    f();
    return f;
}
//#endregion
