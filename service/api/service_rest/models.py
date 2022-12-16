from django.db import models
from django.urls import reverse
from django.core.validators import MinLengthValidator

# Create your models here.


class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveSmallIntegerField(unique=True)

    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.name}, {self.employee_number}"


class SalesRecordVO(models.Model):
    price = models.DecimalField(max_digits=10, decimal_places=2)
    sales_person = models.CharField(max_length=100)
    customer = models.CharField(max_length=100)
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return f"{self.vin}, {self.sales_person}"


class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    model = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.model}, {self.vin}"


class ServiceAppointment(models.Model):
    customer_name = models.CharField(max_length=150)
    date = models.DateField(null=True)
    time = models.TimeField(null=True)
    description = models.TextField()
    VIP = models.BooleanField(default=False)
    VIN = models.CharField(max_length=17, validators=[MinLengthValidator(17)])
    model = models.CharField(max_length=150)
    make = models.CharField(max_length=150)
    color = models.CharField(max_length=100)
    year = models.SmallIntegerField()
    completed = models.BooleanField(default=False)
    in_progress = models.BooleanField(default=False)


    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT,
    )

    def get_api_url(self):
        return reverse("api_service_appointment", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.technician.name}, {self.VIN}, {self.id}"
