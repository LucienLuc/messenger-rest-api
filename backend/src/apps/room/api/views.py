from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

# importing serializers
from apps.room.main.serializers import RoomSerializer
from apps.myauth.main.serializers import UserSerializer, GetUserSerializer
from apps.lobby.main.serializers import LobbySerializer, GetLobbySerializer
from django.contrib.auth import get_user_model
User = get_user_model()
from apps.lobby.main.models import Lobby 

# importing models
from apps.room.main.models import Room

from apps.room.main.permissions import RoomCreator, RoomMember, RoomAdmin

from rest_framework.response import Response

from django.shortcuts import get_object_or_404
# lobbies can only be read 
class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    @action(detail=True, methods=['post'], permission_classes=(RoomCreator, RoomAdmin))
    def KickUser(self, request, pk):
        room = self.get_object()
        serializer = GetUserSerializer(data=dict(request.data.dict()))
        if serializer.is_valid():
            user = get_object_or_404(User, username = serializer.validated_data['username'])
            if user in room.members.all():
                room.members.remove(user)
                return Response(data=request.data, status= 200)
            return Response(data=request.data, status= 400)
        return Response(data=request.data, status= 400)

    @action(detail=True, methods=['post'], permission_classes=(RoomCreator, RoomAdmin))
    def AcceptUser(self, request, pk):
        room = self.get_object()
        serializer = GetUserSerializer(data=dict(request.data.dict()))
        if serializer.is_valid():
            user = user = get_object_or_404(User, username = serializer.validated_data['username'])
            if user in room.requests.all():
                room.members.add(user)
                return Response(data=request.data, status= 200)
            return Response(data=request.data, status= 400)
        return Response(data=request.data, status= 400)

    @action(detail=True, methods=['post'])
    def UserRequest(self, request, pk):
        room = self.get_object()
        serializer = GetUserSerializer(data=dict(request.data.dict()))
        if serializer.is_valid():
            user = user = get_object_or_404(User, username = serializer.validated_data['username'])
            if user not in room.requests.all():
                room.requests.add(user)
                return Response(data=request.data, status= 200)
            return Response(data=request.data, status= 409)
        return Response(data=request.data, status= 400)

    def create(self, request, *args, **kwargs):
        print('in create')
        print(request.data)
        userSerializer = GetUserSerializer(data=request.data['creator'])
        lobbySerializer = GetLobbySerializer(data=request.data['lobby'])
        # RoomSerializer = RoomSerializer(data=request.data)
        if userSerializer.is_valid() and lobbySerializer.is_valid():
            creator = get_object_or_404(User, username = userSerializer.validated_data['username'])
            lobby = get_object_or_404(Lobby, title = lobbySerializer.validated_data['title'])
            obj = Room.objects.create(title=request.data['title'], description=request.data['description'], creator=creator, Lobby = lobby)
            obj.members.add(creator)
            return Response(data=request.data, status= 200)
        return Response(data=request.data, status= 400)

    def get_permissions(self):
        if self.action in ['create', 'list']:
            permission_classes = [IsAuthenticated]
        elif self.action == 'retrieve':
            permission_classes = [RoomMember]
        else:
            permission_classes = [RoomCreator]
        return [permission() for permission in permission_classes]