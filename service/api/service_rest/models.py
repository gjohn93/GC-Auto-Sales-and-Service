from django.db import models
from django.urls import reverse
# Create your models here.

class Technician(models.Model):
    name = models.CharField(max_length = 200)
    employee_number = models.PositiveSmallIntegerField(max_length=40)

    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.pk})

class SalesRecordVO(models.Model):
    price = models.DecimalField(max_digits=10, decimal_places=2)
    sales_person = models.CharField(max_length=100)
    customer = models.CharField(max_length=100)
    vin = models.CharField(max_length=17,unique=True)


class ServiceAppointment(models.Model):
    owner = models.CharField(max_length=150)
    date_time = models.DateTimeField()
    description = models.TextField()
    VIP_treatment = models.BooleanField(default=False)

    technician = models.ForeignKey(
        Technician,
        related_name= "appointments",
        on_delete = models.PROTECT
    )
