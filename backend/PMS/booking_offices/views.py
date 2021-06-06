from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from booking_offices.models import BookingOffice
from booking_offices.serializers import BookingOfficeSerializer
from cars.paginations import CustomPagination


class BookingOfficeView(viewsets.ModelViewSet):
    pagination_class = CustomPagination

    queryset = BookingOffice.objects.all()
    serializer_class = BookingOfficeSerializer
