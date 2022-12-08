from common.json import ModelEncoder
from .models import ServiceAppointment,Technician, AutomobileVO

# Create your views here.

# class SalesRecordVOEncoder(ModelEncoder):
#     model = SalesRecordVO
#     properties = [
#         "price",
#         "sales_person",
#         "customer",
#         "vin"
#     ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number"
    ]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "color",
        "year",
        "vin",
        "model"
    ]

class ServiceAppointmentEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        "customer_name",
        "description",
        "date_time",
        "technician",
        "VIP",
        "VIN",
        "model",
        "make",
        "color",
        "year"

    ]

    encoders = {
        "technician": TechnicianEncoder(),
        # "automobile": AutomobileVOEncoder(),
    }
