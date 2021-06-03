from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from cars.models import Car
from cars.paginations import CustomPagination
from cars.serializations import CarSerializer


class CarView(viewsets.ModelViewSet):
    pagination_class = CustomPagination
    queryset = Car.objects.all()
    serializer_class = CarSerializer
