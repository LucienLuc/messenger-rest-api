from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics
from django.views import View

from apps.chat.models import Room
from apps.chat.serializers import RoomSerializer

class RoomList(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class AddRoom(View):
    def post(self, request):
        theName = request.POST.get("name")
        newRoom = Room.objects.create(name=theName)
        newRoom.save()
        return HttpResponse(status=200)

    