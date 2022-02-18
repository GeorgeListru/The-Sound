from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer, UserSerializer, ArtistSerializer, SongSerializer, \
    PlaylistSongSerializer, PlaylistSerializer, ProfileSerializer
from django.contrib.auth.models import User
from .models import Profile


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
