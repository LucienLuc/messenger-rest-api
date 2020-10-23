from django.contrib import admin
from django.urls import path, include, register_converter

# defining url paths
adminPath = 'admin/'
authPath = 'auth/'
lobby = 'lobby/'
room = 'room/'
message = 'message/'

# urlpatterns (url paths mapped to views or other urlpatterns)
urlpatterns = [
    path(adminPath, admin.site.urls),
    path(authPath, include('apps.myauth.api.urls')),
    path(lobby, include('apps.lobby.api.urls')),
    path(room, include('apps.room.api.urls')),
    path(message, include('apps.message.api.urls'))
]