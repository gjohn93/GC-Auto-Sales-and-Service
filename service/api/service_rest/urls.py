from django.urls import path
from .views import api_technicians,api_technician, api_service_appointments, api_service_appointment

urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("technicians/<int:id>/", api_technician, name="api_technician"),
    path("service_appointments/", api_service_appointments, name="api_service_appointments"),
    path("service_appointments/<int:id>/", api_service_appointment, name="api_service_appointment")
]
