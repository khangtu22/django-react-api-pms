from django.shortcuts import render


# Create your views here.
from rest_framework import viewsets

from parking_lot.models import ParkingLot
from parking_lot.serializers import ParkingLotSerializer


class ParkingLotView(viewsets.ModelViewSet):
    queryset = ParkingLot.objects.all()
    serializer_class = ParkingLotSerializer
