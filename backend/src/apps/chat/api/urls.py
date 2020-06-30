from django.urls import path
from . import views
urlpatterns = [
    path('addRoom<slug:room>', views.AddRoom.as_view()),
    path('getRooms', views.RoomList.as_view())
]