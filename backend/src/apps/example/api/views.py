
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse

from apps.example.models import Example

def ExampleView(request):
    ex = Example.objects.all()[:5]
    data = {"results": list(ex.values("title", "content"))}
    return JsonResponse(data)