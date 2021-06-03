from django.db import models


# Create your models here.
class ParkingLot(models.Model):
    parkID = models.AutoField(null=False, primary_key=True)
    parkArea = models.IntegerField()
    parkName = models.CharField(max_length=30)
    parkPlace = models.CharField(max_length=60)
    parkPrice = models.IntegerField()
    parkStatus = models.CharField(max_length=20)

    def __str__(self):
        return self.parkName
