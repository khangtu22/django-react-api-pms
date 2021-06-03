from django.db import models

# Create your models here.
from cars.models import Car
from trips.models import Trip


class Ticket(models.Model):
    ticketID = models.AutoField(null=False, primary_key=True)
    bookTime = models.TimeField()
    customerName = models.CharField(max_length=20)
    licensePlate = models.ForeignKey(Car, on_delete=models.CASCADE)
    tripID = models.ForeignKey(Trip, on_delete=models.CASCADE, verbose_name="the related trip")

    def __str__(self):
        return self.customerName
