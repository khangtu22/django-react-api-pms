from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from cars.paginations import CustomPagination
from tickets.models import Ticket
from tickets.serializers import TicketSerializer


class TicketView(viewsets.ModelViewSet):
    pagination_class = CustomPagination
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
