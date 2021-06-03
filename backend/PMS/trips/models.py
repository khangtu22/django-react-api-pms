from django.db import models


# Create your models here.
class Trip(models.Model):
    tripID = models.AutoField(primary_key=True)
    bookedTicketNumber = models.IntegerField(null=False)
    carType = models.CharField(max_length=50, null=False)
    departureDate = models.DateField(null=False)
    departureTime = models.TimeField(null=False)
    destination = models.CharField(max_length=50, null=False)
    driver = models.CharField(max_length=50, null=False)
    maximumOnlineTicketNumber = models.IntegerField(null=False)

    def __str__(self):
        return self.destination
