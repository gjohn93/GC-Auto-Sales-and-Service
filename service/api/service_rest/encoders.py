from common.json import ModelEncoder
from .models import ServiceAppointment,Technician, AutomobileVO
import json

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
        "year",
        "id"
    ]

    def get_extra_data(self, o):
        dateTime = json.dumps(o.date_time, default=str)
        dateTime = json.loads(dateTime)
        return{
            "dateTime": dateTime, "technician_name": o.technician.name, "str_VIP": str(o.VIP).lower()
        }

    encoders = {
        "technician": TechnicianEncoder(),
        # "automobile": AutomobileVOEncoder(),
    }
