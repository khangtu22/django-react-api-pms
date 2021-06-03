from django.db import models

# Create your models here.
from trips.models import Trip


class BookingOffice(models.Model):
    officeID = models.AutoField(primary_key=True)
    officeName = models.CharField(max_length=20)
    officePhone = models.CharField(max_length=20)
    officePlace = models.CharField(max_length=50)
    officePrice = models.IntegerField()
    startContractDeadline = models.DateField()
    endContractDeadline = models.DateField()
    tripID = models.ForeignKey(Trip, on_delete=models.CASCADE)

    def __str__(self):
        return self.officeName
