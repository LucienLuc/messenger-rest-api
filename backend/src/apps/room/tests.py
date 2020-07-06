from rest_framework.test import APIRequestFactory
from apps.room.api.views import RoomViewSet
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model as user_model
User = user_model()
from apps.lobby.main.models import Lobby
from apps.room.main.models import Room
from rest_framework.test import force_authenticate
from apps.room.main.serializers import RoomSerializer
import io
from rest_framework.parsers import JSONParser
import json


class RoomViewSetTest(APITestCase):

    def setUp(self):
        # create user
        self.user = User(username='a')
        self.user.save()
        self.lobby = Lobby(title='Lobby1', description='test')
        self.lobby.save()
        self.room = Room(title='Room1', description='test', creator=self.user, Lobby=self.lobby)
        self.room.members.add(self.user)
        self.room.save()

    def tearDown(self):
        pass

    def testDetailViewBasicFunctionality(self):
        # create request
        factory = APIRequestFactory()
        request = factory.get('/room/Room1', {}, format='json')
        force_authenticate(request, user=self.user)
        # create view
        view = RoomViewSet.as_view(actions={'get': 'retrieve'})
        # get response
        response = view(request, pk='Room1')
        room1 = response.data
        print(room1)
        data = json.dumps(room1)
        print(data)
        ser = RoomSerializer(data=data)
        if ser.is_valid():
            self.assertEqual(ser.validated_data, self.room)

    def testKickUser(self):
        pass

    def testAcceptUser(self):
        pass