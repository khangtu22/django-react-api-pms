from rest_framework import serializers

from booking_offices.models import BookingOffice


class BookingOfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingOffice
        fields = '__all__'