from rest_framework import serializers

from .models import Lobby

class LobbySerializer(serializers.ModelSerializer):
    room_lobby = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Lobby
        fields = ['title','room_lobby']
        # depth = 1
        