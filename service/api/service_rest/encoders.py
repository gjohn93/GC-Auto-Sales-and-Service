from common.json import ModelEncoder
from .models import SalesRecordVO, AutomobileVO, ServiceAppointment,Technician

# Create your views here.
class SalesRecordVOEncoder(ModelEncoder):
    model = SalesRecordVO
    properties = [
        "price",
        "sales_person",
        "customer",
        "vin"
    ]

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
        "date_time",
        "description",
        "VIP_treatment",
        "technician",
        "sales_record",
        "automobile"
    ]

    encoders = {
        "technician": TechnicianEncoder,
        "sales_record": SalesRecordVOEncoder,
        "automobile": AutomobileVOEncoder,

    }
