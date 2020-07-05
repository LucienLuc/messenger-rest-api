from rest_framework import permissions

class RoomMember(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.members

class RoomAdmin(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.admin

class RoomCreator(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.creator