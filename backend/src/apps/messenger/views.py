# from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
# from rest_auth.registration.views import SocialLoginView
# from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
# from rest_auth.registration.views import SocialLoginView
# from rest_auth.social_serializers import TwitterLoginSerializer

# class TwitterLogin(SocialLoginView):
#     serializer_class = TwitterLoginSerializer
#     adapter_class = TwitterOAuthAdapter

# class FacebookLogin(SocialLoginView):
#     adapter_class = FacebookOAuth2Adapter

from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def restricted(request, *args, **kwargs):
    return Response(data='only logged in', status=status.HTTP_200_OK)
