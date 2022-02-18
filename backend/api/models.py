from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False, blank=False)


class Playlist(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, null=False, blank=False)
    duration = models.DurationField(null=False, blank=False)


class Artist(models.Model):
    artist = models.CharField(max_length=64, null=False, blank=False)
    is_active = models.BooleanField(default=False)


class Song(models.Model):
    artist = models.ManyToManyField(Artist, blank=False)
    name = models.CharField(max_length=255, null=False, blank=False)
    length = models.DurationField(null=False, blank=False)


def get_default_song_position(instance):
    return len(instance.Playlist)


class PlaylistSong(models.Model):
    song = models.OneToOneField(Song, on_delete=models.CASCADE, null=False, blank=False)
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE, null=False, blank=False)
    position = models.IntegerField(unique=True, blank=False, null=False, default=get_default_song_position)
    date_added = models.DateTimeField(auto_now_add=True, null=False, blank=False)
