from django.urls import path
from . import views

urlpatterns = [
    path('roomRequests/', views.RoomRequest.as_view()),
    path('getRecentMessages', views.GetNRecentMessages.as_view()),
    path('changeDescription', views.ChangeDescription.as_view()),
    path('kickUser', views.KickUser.as_view()),
    path('acceptUser/', views.AcceptUser.as_view()),
    path('adminPromotionDemotion', views.AdminPromotionDemotion.as_view()),
    path('changeRoomTitle', views.ChangeRoomTitle.as_view()),
    path('promoteToCreator', views.CreatorPromotion.as_view()),
    path('getRooms/', views.RoomList.as_view()),
    path('createRooms/', views.CreateRoom.as_view())
]