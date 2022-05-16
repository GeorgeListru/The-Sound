from django.urls import path
from .views import LoginView, Register, GetUserData, GetExploreSongs, \
    UploadSong, AddArtist, GetArtists, GetSong, CreatePlaylist, GetUserPlaylists, \
    GetPlaylist, AddSongToPlaylist, GetPlaylistSongs

urlpatterns = [
    path('login', LoginView.as_view(), name='login'),
    path('register', Register, name='register'),
    path('profile', GetUserData, name='user-data'),
    path('explore', GetExploreSongs, name='explore'),
    path('upload-song', UploadSong, name='upload-song'),
    path('add-artist', AddArtist, name='add-artist'),
    path('get-artists/<name>', GetArtists, name="get-artists"),
    path('get-song/<song_id>', GetSong, name="get-song"),
    path('add-playlist', CreatePlaylist, name='add-playlist'),
    path('get-playlists', GetUserPlaylists, name='get-playlists'),
    path('get-playlist/<id>', GetPlaylist, name='get-playlist'),
    path('add-song-to-playlist', AddSongToPlaylist, name='add-song-to-playlist'),
    path('get-playlist-songs/<playlist_id>', GetPlaylistSongs, name='get-playlist-songs')
]
