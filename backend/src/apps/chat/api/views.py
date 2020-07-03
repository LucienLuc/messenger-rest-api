from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics
from django.views import View
from rest_framework.views import APIView

from apps.chat.models import Room
from apps.chat.serializers import CreRoomSerializer, RoomSerializer, RequestSerializer, TitleSerializer, DescriptionSerializer, MessageSerializer, AcceptSerializer
from rest_framework.response import Response
from rest_framework import status
from apps.chat.models import Room, Request, User

class RoomList(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
from django.views.decorators.csrf import csrf_exempt

class CreateRoom(APIView):
    def post(self, request, format=None):
        serializer = CreRoomSerializer(data=request.data)
        if serializer.is_valid():
            roomName = serializer.validated_data['title']
            des = serializer.validated_data['description']
            user = request.user
            print(user)
            room = Room(title=roomName, description=des, creator=user)
            room.save()
            room.members.add(user)
            room.save()
            return Response(status=200)


class RoomRequest(APIView):
    def post(self, request, format=None):
        serializer = RequestSerializer(data=request.data)
        if serializer.is_valid():
            roomName = serializer.validated_data['roomName']
            room = Room.objects.get(title=roomName)
            user = User.objects.get(username=request.user)
            request = Request.objects.create(requestor=user, roomName=room)
            request.save()
            return Response(status=200)

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
        if serializer.is_valid():
            roomName = serializer.validated_data['roomName']
            username = serializer.validated_data['username']
            request = Request.objects.get(roomName__title=roomName, requestor__username=username)
            request.delete()
            room = Room.objects.get(title=roomName)
            user = User.objects.get(username=username)
            room.members.add(user)
            return Response(status=200)

class KickUser(APIView):
    def post(self, request, format=None):
        serializer = AcceptSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            roomName = serializer.validated_data['roomName']
            username = serializer.validated_data['username']
            room = Room.objects.get(title=roomName)
            user = User.objects.get(username=username)
            room.members.remove(user)
            return Response(status=200)

class AdminPromotionDemotion(APIView):
    def post(self, request, format=None):
        serializer = ActionSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            roomName = serializer.validated_data['roomName']
            username = serializer.validated_data['username']
            room = Room.objects.get(title=roomName)
            user = User.objects.get(username=username)
            choice = serializer.validated_data['choices']
            if choice == 'demote':
                room.admin.remove(user)
                return Response(status=200)
            elif choice == 'promote':
                room.admin.add(user)
                return Response(status=200)

class CreatorPromotion(APIView):
    def post(self, request, format=None):
        serializer = AcceptSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            roomName = serializer.validated_data['roomName']
            username = serializer.validated_data['username']
            room = Room.objects.get(title=roomName)
            user = User.objects.get(username=username)
            room.creator = user
            room.admin.add(user)
            return Response(status=200)

class ChangeRoomTitle(APIView):
    def post(self, request, format=None):
        serializer = TitleSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            roomName = serializer.validated_data['roomName']
            title = serializer.validated_data['title']
            room = Room.objects.get(title=roomName)
            room.title = title
            return Response(status=200)

class ChangeDescription(APIView):
    def post(self, request, format=None):
        serializer = DescriptionSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            roomName = serializer.validated_data['roomName']
            description = serializer.validated_data['description']
            room = Room.objects.get(title=roomName)
            room.description = description
            return Response(status=200)


class GetNRecentMessages(APIView):
    def get(self, request, fromat=None):
        serializer = MessSerializer(data=request.query_params)
        if serializer.is_valid():
            roomName = serializer.validated_data['roomName']
            time = serializer.validated_data['time']
            amount = serializer.validated_data['amount']
            messages = Message.objects.filter(room__title=roomName, date__gte=time).order_by('date')[:amount]
            mes = MessageSerializer(messages)
            return Response(data = mes, status=200)

# path('getRecentMessages<int:num>',),