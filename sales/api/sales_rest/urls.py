from django.urls import path

from .views import (
    api_sales_records,
    api_customers,
    api_sales_persons,
    api_sales_record,
    api_customer,
    api_sales_person,
)

urlpatterns = [
    path(
        "sales_records/",
        api_sales_records,
        name="api_sales_records"
    ),
    path(
        "customers/",
        api_customers,
        name="api_customers"
    ),
    path(
        "sales_person/<int:sales_person_employee_number>/sales_records/",
        api_sales_records,
        name="api_employee_sales_records",
    ),
    path(
        "sales_record/<int:id>/",
        api_sales_record,
        name="api_sales_record",
    ),
    path(
        "customer/<int:id>/",
        api_customer,
        name="customer",
    ),
    path(
        "sales_person/<int:id>/",
        api_sales_person,
        name="sales_person",
    ),
]
