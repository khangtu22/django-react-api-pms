from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from booking_offices.models import BookingOffice
from booking_offices.serializers import BookingOfficeSerializer


class BookingOfficeView(viewsets.ModelViewSet):
    queryset = BookingOffice.objects.all()
    serializer_class = BookingOfficeSerializer
