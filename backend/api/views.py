import artist as artist
from django.contrib.auth.hashers import make_password
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer, UserSerializer, ArtistSerializer, SongSerializer, \
    PlaylistSongSerializer, PlaylistSerializer, ProfileSerializer
from django.contrib.auth.models import User
from .models import Profile, Song, Artist, Playlist, PlaylistSong


class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def Register(request):
    data = request.data
    try:
        username = data.get('email')
        email = data.get('username')
        password = data.get('password')
        user = User.objects.create(username=username, email=email, password=make_password(password))
        Profile.objects.create(user=user)

        message = {'details': "User register successfully"}
        status_code = status.HTTP_200_OK
    except:
        message = {'details': "Something went wrong"}
        status_code = status.HTTP_400_BAD_REQUEST
    return Response(message, status=status_code)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def GetUserData(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def GetExploreSongs(request):
    nrOfSongs = 5
    songs = Song.objects.all().order_by('?')[:nrOfSongs]
    serializedSongs = SongSerializer(songs, many=True)
    return Response(serializedSongs.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def GetSong(request, song_id):
    user = request.user
    song = Song.objects.get(pk=song_id)
    localFile = open(song.get_file_path(), "rb")
    response = HttpResponse(localFile, content_type='')
    response['Content-Type'] = "application/octet-stream"
    response["Content-Disposition"] = f"attachment; filename={song.get_file_name()}"
    return response


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def UploadSong(request):
    user = request.user
    data = request.data
    song_name = data.get('song_name')
    artistsIDs = list(data.get('artists'))
    artistsIDs = [ID for ID in artistsIDs if ID != ","]

    file = data.get('file')

    dbArtists = Artist.objects.filter(id__in=artistsIDs)

    if dbArtists:
        song = Song.objects.create(
            file=file,
            name=song_name,
        )
        song.artist.set(dbArtists)
    message = {'details': "Song uploaded successfully"}
    status_code = status.HTTP_200_OK
    return Response(message, status=status_code)


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def AddArtist(request):
    user = request.user
    data = request.data
    artist_name = data.get('artist_name')
    artist = Artist.objects.create(artist=artist_name)
    message = {'details': "Artist added successfully"}
    status_code = status.HTTP_200_OK
    return Response(message, status=status_code)


@api_view(['GET'])
def GetArtists(request, name):
    user = request.user
    artists = Artist.objects.filter(artist__contains=name)
    if artists:
        serializedArtists = ArtistSerializer(artists, many=True)
        data = [artist for artist in serializedArtists.data if artist['is_active']]
        return Response(data[:4])


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def CreatePlaylist(request):
    user = request.user
    data = request.data
    title = data.get('title')
    description = data.get('description')
    profile = Profile.objects.get(user=user)
    playlist = Playlist.objects.create(
        profile=profile,
        title=title,
        description=description
    )
    message = {'details': "Playlist added successfully", "id": playlist.id}
    status_code = status.HTTP_200_OK
    return Response(message, status=status_code)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def GetUserPlaylists(request):
    user = request.user
    profile = Profile.objects.get(user=user)
    playlists = Playlist.objects.filter(profile=profile)
    serializedPlaylists = PlaylistSerializer(playlists, many=True)
    return Response(serializedPlaylists.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def GetPlaylist(request, id):
    user = request.user
    profile = Profile.objects.get(user=user)
    playlist = Playlist.objects.get(pk=id)
    if playlist.profile == profile:
        serializedPlaylist = PlaylistSerializer(playlist, many=False)
        return Response(serializedPlaylist.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddSongToPlaylist(request):
    user = request.user
    data = request.data
    profile = Profile.objects.get(user=user)
    playlist_id = data.get('playlist_id')
    song_id = data.get('song_id')
    playlist = Playlist.objects.get(pk=playlist_id)
    song = Song.objects.get(pk=song_id)
    nr_of_playlist_songs = len(PlaylistSong.objects.filter(playlist=playlist))
    playlistSong = PlaylistSong.objects.create(song=song, playlist=playlist, position=nr_of_playlist_songs)
    serializedPlaylistSong = PlaylistSongSerializer(playlistSong, many=False)
    return Response(serializedPlaylistSong.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def GetPlaylistSongs(request, playlist_id):
    user = request.user
    playlist = Playlist.objects.get(id=playlist_id)
    playlistSongs = PlaylistSong.objects.filter(playlist=playlist)
    serializedPlaylistSong = PlaylistSongSerializer(playlistSongs, many=True)
    data = []
    for playlistSong in playlistSongs:
        serializedPlaylistSong = PlaylistSongSerializer(playlist, many=False)
        serializedSong = SongSerializer(playlistSong.song, many=False)

    return Response(serializedPlaylistSong.data)
