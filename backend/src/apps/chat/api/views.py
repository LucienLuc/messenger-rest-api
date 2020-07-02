from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics
from django.views import View
from rest_framework.views import APIView

from apps.chat.models import Room
from apps.chat.serializers import RoomSerializer, RequestSerializer, AcceptSerializer
from rest_framework.response import Response
from rest_framework import status
from apps.chat.models import Room, Request, User

class RoomList(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
from django.views.decorators.csrf import csrf_exempt


class ReqToJoinRoom(APIView):
    def post(self, request, format=None):
        serializer = RequestSerializer(data=request.data)
        if serializer.is_valid():
            roomName = serializer.validated_data['roomName']
            room = Room.objects.get(title=roomName)
            user = User.objects.get(username=request.user)
            request = Request.objects.create(requestor=user, roomName=room)
            request.save()
            return Response(status=200)

class GetRequestsForRoom(APIView):
    def get(self, request, format=None):
        serializer = RequestSerializer(data=request.query_params)
        if serializer.is_valid():
            roomName = serializer.validated_data['roomName']
            requests = Request.objects.filter(roomName__title=roomName)
            reqNames = []
            for req in requests:
                reqNames.append(req.requestor.username)
            return Response(data = reqNames, status=200)

class AcceptUser(APIView):
    def post(self, request, format=None):
        serializer = AcceptSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            roomName = serializer.validated_data['roomName']
            username = serializer.validated_data['username']
            print('reached1')
            request = Request.objects.get(roomName__title=roomName, requestor__username=username)
            print('reached2')
            request.delete()
            print('reached3')
            room = Room.objects.get(title=roomName)
            print('reached4')
            user = User.objects.get(username=username)
            room.members.add(user)
            return Response(status=200)

#  path('requestToJoinRoom<slug:roomName>',),
#     path('getRecentMessages<int:num>',),
#     path('changeDescription',),
#     path('kickUser<slug:username>',),
#     path('acceptUser<slug:username>',),
#     path('promoteToAdmin<slug:username>',),
#     path('demoteToMember<slug:username>',),
#     path('promoteToCreator<slug:username>',),

    