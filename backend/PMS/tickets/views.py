from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from tickets.models import Ticket
from tickets.serializers import TicketSerializer


class TicketView(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
