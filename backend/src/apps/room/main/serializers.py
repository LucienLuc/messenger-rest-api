from rest_framework import serializers
from django.db import models
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    members = serializers.PrimaryKeyRelatedField(many=True, read_only = True)
    admins = serializers.PrimaryKeyRelatedField(many=True, read_only = True)
    onlineUsers = serializers.PrimaryKeyRelatedField(many=True, read_only = True)
    requests = serializers.PrimaryKeyRelatedField(many=True, read_only = True)
    class Meta:
        model = Room
        fields = ['title', 'members', 'admins','onlineUsers','requests']

class GetRoomSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=30)

    