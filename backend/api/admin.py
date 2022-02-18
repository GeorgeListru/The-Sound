from django.contrib import admin
from .models import Profile, Artist, Playlist, Song, PlaylistSong

admin.site.register(Profile)
admin.site.register(Artist)
admin.site.register(Playlist)
admin.site.register(Song)
admin.site.register(PlaylistSong)
