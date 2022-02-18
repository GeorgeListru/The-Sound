from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenObtainSerializer, get_user_model
from .models import Profile, Playlist, PlaylistSong, Song, Artist


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"


class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"


class PlaylistSongSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'isAdmin']

    def get_isAdmin(self, obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


# class EmailTokenObtainSerializer(TokenObtainSerializer):
#     username_field = 'email'


class MyTokenObtainPairSerializer(TokenObtainSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data
