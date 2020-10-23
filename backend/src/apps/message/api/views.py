from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
# importing serializers
from apps.message.main.serializers import MessageSerializer
from apps.myauth.main.serializers import UserSerializer, GetUserSerializer
from apps.room.main.serializers import RoomSerializer, GetRoomSerializer
# # importing models
from django.contrib.auth import get_user_model
from apps.message.main.models import Message
User = get_user_model()
from apps.room.main.models import Room

from django.shortcuts import get_object_or_404

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def create(self, request, *args, **kwargs):
        userSerializer = GetUserSerializer(data=request.data['sender'])
        roomSerializer = GetRoomSerializer(data=request.data['room'])
        if userSerializer.is_valid() and roomSerializer.is_valid():
            user = get_object_or_404(User, username = userSerializer.validated_data['username'])
            room = get_object_or_404(Room, title=roomSerializer.validated_data['title'])
            obj = Message.objects.create(sender=user, message=request.data['message'])
            room.messages.add(obj)
            return Response(data=request.data, status=200)
        return Response(data=request.data, status=400)
    
    def get_permissions(self):
        permission_classes = []
        if self.action in ['create', 'list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]