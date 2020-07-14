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

from rest_framework.test import APIClient

class RoomViewSetTest(APITestCase):

    def setUp(self):
        # create user
        self.user = User(username='a')
        self.user.save()
        self.user2 = User(username='b')
        self.user2.save()
        self.user3= User(username='c')
        self.user3.save()
        self.lobby = Lobby(title='Lobby1', description='test')
        self.lobby.save()
        self.room = Room(title='Room1', description='test', creator=self.user, Lobby=self.lobby)
        self.room.members.add(self.user)
        self.room.members.add(self.user2)
        self.room.requests.add(self.user3)
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
        # print(room1)
        data = json.dumps(room1)
        # print(data)
        ser = RoomSerializer(data=data)
        if ser.is_valid():
            self.assertEqual(ser.validated_data, self.room)

    def testKickUser1(self):
        client = APIClient()
        client.force_authenticate(user=self.user)
        # print("room status before:" + str(Room.objects.get(title='Room1').members.all()))
        response = client.post('/room/Room1/KickUser/', {'username': 'b'})
        # print('response:' + str(response))
        # check user2 is not in Room.objects.get(title='Room1').members
        assert(str(Room.objects.get(title='Room1').members.all()) == '<QuerySet [<User: a>]>')
        # print("test kick user:" + str(Room.objects.get(title='Room1').members.all()))
    
    def testKickUser2(self):
        client = APIClient()
        client.force_authenticate(user=self.user)
        # print("room status before:" + str(Room.objects.get(title='Room1').members.all()))
        response = client.post('/room/Room1/KickUser/', {'username': 'c'})
        # print('response:' + str(response))
        # check user2 is not in Room.objects.get(title='Room1').members
        assert(str(Room.objects.get(title='Room1').members.all()) ==  '<QuerySet [<User: a>, <User: b>]>')

    def testAcceptUser1(self):
        client = APIClient()
        client.force_authenticate(user=self.user)
        # print(str(Room.objects.get(title='Room1').members.all()))
        response = client.post('/room/Room1/AcceptUser/', {'username': 'c'})
        # print(response)
        assert(str(Room.objects.get(title='Room1').members.all()) == '<QuerySet [<User: a>, <User: b>, <User: c>]>')

    def testAcceptUser2(self):
        client = APIClient()
        client.force_authenticate(user=self.user)
        # print(str(Room.objects.get(title='Room1').members.all()))
        response = client.post('/room/Room1/AcceptUser/', {'username': 'a'})
        # print(response)
        print(str(Room.objects.get(title='Room1').members.all()))