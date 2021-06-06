from rest_framework import viewsets

from cars.paginations import CustomPagination
from trips.models import Trip
from trips.serializers import TripSerializer


class TripViewSet(viewsets.ModelViewSet):
    pagination_class = CustomPagination

    queryset = Trip.objects.all()
    serializer_class = TripSerializer


