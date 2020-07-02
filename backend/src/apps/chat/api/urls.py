from django.urls import path
from . import views
urlpatterns = [
    path('requestToJoinRoom/', views.ReqToJoinRoom.as_view()),
    path('getRequestsForRoom/', views.GetRequestsForRoom.as_view()),
    # path('getRecentMessages',),
    # path('changeDescription',),
    # path('kickUser',),
    path('acceptUser/', views.AcceptUser.as_view()),
    # path('promoteToAdmin',),
    # path('demoteToMember',),
    # path('promoteToCreator',),
    path('getRooms/', views.RoomList.as_view())
]


        # edit creating a room - available to logged in users
        # add request to join room - available to logged in users
        # have a get n recent messages - available to members
        # add change description - available to creators
        # add kick user - available to creators and admin, available to member if it is
        #     themself they are kicking
        # add accept x member - available to creators and admin
        # add get notifications - available to logged in users
        # add promote to admin - available to creators
        # add demote to member - available to creators
        # add promote to creator - available to creators