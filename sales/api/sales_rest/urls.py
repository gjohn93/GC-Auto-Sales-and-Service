from django.urls import path

from.views import (
    api_sales_records,
    api_customers,
    api_sales_persons,
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
        "sales_persons/",
        api_sales_persons,
        name="api_sales_persons",
    ),
    path(
        "sales_person/<int:sales_person_employee_number>/sales_records/",
        api_sales_records,
         name="api_employee_sales_records",
    )
]
