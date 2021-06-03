from django.db import models


# Create your models here.
class Employee(models.Model):
    employeeID = models.AutoField(null=False, primary_key=True)
    account = models.CharField(max_length=50)
    department = models.CharField(max_length=10)
    employeeAddress = models.CharField(max_length=50)
    employeeBirthDate = models.DateField()
    employeeEmail = models.EmailField(max_length=50)
    employeeName = models.CharField(max_length=50)
    employeePhone = models.CharField(max_length=10)
    password = models.CharField(max_length=20)

    # Name of employee will display in the admin later on.
    def __str__(self):
        return self.employeeName
