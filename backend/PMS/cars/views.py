from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from cars.models import Car
from cars.serializations import CarSerializer


class CarView(viewsets.ModelViewSet):
    queryset = Car.objects.all();
    serializer_class = CarSerializer
