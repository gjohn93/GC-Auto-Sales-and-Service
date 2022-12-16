from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    model = models.CharField(max_length=150, null=True)

    def __str__(self):
        return f"{self.vin}"


class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveSmallIntegerField()

    def get_api_url(self):
        return reverse("api_sales_person", kwargs={"pk": self.id})

    def __str__(self):
        return f"{self.name}, {self.id}"


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=20)

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.id})

    def __str__(self):
        return f"{self.name}, {self.id}"


class SalesRecord(models.Model):
    price = models.DecimalField(max_digits=10, decimal_places=2)
    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sales_record",
        on_delete=models.PROTECT,
    )

    customer = models.ForeignKey(
        Customer,
        related_name="sales_record",
        on_delete=models.PROTECT,
    )
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales_record",
        on_delete=models.PROTECT,

    )

    def get_api_url(self):
        return reverse("api_sales_record", kwargs={"pk": self.id})

    def __str__(self):
        return f"{self.id}"
