from django.shortcuts import render


# Create your views here.
from rest_framework import viewsets

from cars.paginations import CustomPagination
from parking_lot.models import ParkingLot
from parking_lot.serializers import ParkingLotSerializer


class ParkingLotView(viewsets.ModelViewSet):
    pagination_class = CustomPagination

    queryset = ParkingLot.objects.all()
    serializer_class = ParkingLotSerializer
