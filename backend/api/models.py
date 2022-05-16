from django.db import models
from django.contrib.auth.models import User
import os
from django.utils.timezone import now
import datetime


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False, blank=False)


class Playlist(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, null=False, blank=False)
    duration = models.DurationField(null=False, blank=False, default=datetime.timedelta(seconds=0))
    title = models.CharField(max_length=64, null=False, blank=False, default='')
    description = models.TextField(max_length=256, default='')

    def __str__(self):
        return str(self.profile.user.username) + " - " + str(self.title) + " (" + str(self.id) + ")"


class Artist(models.Model):
    artist = models.CharField(max_length=64, unique=True, null=False, blank=False)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return str(self.artist) + " - " + ("Active" if self.is_active else "Inactive")


class Song(models.Model):
    file = models.FileField(upload_to='songs/', null=True, blank=True)
    artist = models.ManyToManyField(Artist, blank=False)
    name = models.CharField(max_length=255, null=False, blank=False)
    plays = models.IntegerField(null=False, blank=False, default=0)
    date_added = models.DateTimeField(blank=False, default=now, editable=False)

    def get_file_name(self):
        return os.path.basename(self.file.path)

    def get_file_path(self):
        return self.file.path

    def __str__(self):
        artists = ", ".join([artist.artist for artist in self.artist.all()])
        return str(self.name) + " - " + str(artists)


def get_default_song_position(instance):
    return len(instance.playlist)


class PlaylistSong(models.Model):
    song = models.OneToOneField(Song, on_delete=models.CASCADE, null=False, blank=False, unique=True)
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE, null=False, blank=False)
    position = models.IntegerField(unique=True, blank=False, null=True)
    date_added = models.DateTimeField(auto_now_add=True, null=False, blank=False)

    def __str__(self):
        return "[" + str(self.playlist.title) + "] " + str(self.playlist.profile.user.username) + " - " + str(self.song)
