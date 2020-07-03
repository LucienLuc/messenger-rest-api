from rest_framework import serializers
from .models import Room, Request, Message

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

# serializer for room name, get user

class RequestSerializer(serializers.Serializer):
    roomName = serializers.CharField(max_length=50)

class CreRoomSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=50)
    description = serializers.CharField(required=False, max_length=100, default='')


class TitleSerializer(serializers.Serializer):
    roomName = serializers.CharField(max_length=50)
    title = serializers.CharField(max_length=50)


class AcceptSerializer(serializers.Serializer):
    roomName = serializers.CharField(max_length=50)
    username = serializers.CharField(max_length=50)

class DescriptionSerializer(serializers.Serializer):
    description = serializers.CharField(max_length=500)
    roomName = serializers.CharField(max_length=50)

ADMIN_CHOICES =(  
    ("promote", "demote"),  
    ("demote", "promote"),
) 

class ActionSerializer(serializers.Serializer):
    roomName = serializers.CharField(max_length=50)
    username = serializers.CharField(max_length=50)
    choices = serializers.ChoiceField(choices = ADMIN_CHOICES) 

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'


