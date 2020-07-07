from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

# importing serializers
from apps.room.main.serializers import RoomSerializer
from apps.myauth.main.serializers import UserSerializer

# importing models
from apps.room.main.models import Room

from apps.room.main.permissions import RoomCreator, RoomMember, RoomAdmin


import json
# lobbies can only be read 
class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    @action(detail=True, methods=['post'], permission_classes=(RoomCreator, RoomAdmin))
    def KickUser(self, request, pk):
        print("request.data" + str(request.data))
        room = self.get_object()
        serializer = UserSerializer(data=json.dumps(request.data))
        print('serializer: ' + str(serializer))
        print('serializer valid?: ' + str(serializer.is_valid()))
        if serializer.is_valid():
            user = serializer.save()
            if user in room.members:
                room.members.remove(user)


    @action(detail=True, methods=['post'], permission_classes=(RoomCreator, RoomAdmin))
    def AcceptUser(self, request, pk):
        room = self.get_object()
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user in room.requests:
                room.members.add(user)

    def get_permissions(self):
        if self.action in ['create', 'list']:
            permission_classes = [IsAuthenticated]
        elif self.action == 'retrieve':
            permission_classes = [RoomMember]
        else:
            permission_classes = [RoomCreator]
        return [permission() for permission in permission_classes]