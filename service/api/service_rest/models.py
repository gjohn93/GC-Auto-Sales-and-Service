from django.db import models
from django.urls import reverse
# Create your models here.

class Technician(models.Model):
    name = models.CharField(max_length = 200)
    employee_number = models.PositiveSmallIntegerField()

    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.name}, {self.employee_number}"

class SalesRecordVO(models.Model):
    price = models.DecimalField(max_digits=10, decimal_places=2)
    sales_person = models.CharField(max_length=100)
    customer = models.CharField(max_length=100)
    vin = models.CharField(max_length=17,unique=True)

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
    owner = models.CharField(max_length=150)
    date_time = models.DateTimeField()
    description = models.TextField()
    VIP_treatment = models.BooleanField(default=False)

    technician = models.ForeignKey(
        Technician,
        related_name= "appointments",
        on_delete = models.PROTECT,
    )

    sales_record = models.ForeignKey(
        SalesRecordVO,
        related_name = "appointments",
        on_delete= models.PROTECT,
    )

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name = "appointments",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_service_appointment", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.owner}, {self.automobile}"
