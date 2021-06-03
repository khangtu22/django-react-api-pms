from django.db import models
from parking_lot.models import ParkingLot


# Create your models here.
class Car(models.Model):
    licensePlate = models.CharField(max_length=20, primary_key=True)
    carColor = models.CharField(max_length=20)
    carType = models.CharField(max_length=20)
    company = models.CharField(max_length=30)
    parkID = models.ForeignKey(ParkingLot, on_delete=models.CASCADE)

    def __str__(self):
        return self.licensePlate
