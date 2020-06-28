from django.urls import path
from .views import ExampleView

urlpatterns = [
    path('', ExampleView, name='Example')
]