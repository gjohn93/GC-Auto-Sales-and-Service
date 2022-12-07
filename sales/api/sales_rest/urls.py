from django.urls import path

from.views import (
    api_sales_records,
)

urlpatterns = [
    path(
        "sales_records/",
        api_sales_records,
        name="api_sales_records"
    )
]
