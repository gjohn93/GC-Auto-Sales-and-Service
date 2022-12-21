from common.json import ModelEncoder
from .models import ServiceAppointment, Technician, AutomobileVO
import json


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["name", "employee_number"]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["color", "year", "vin", "model"]


class ServiceAppointmentEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        "customer_name",
        "description",
        "date",
        "time",
        "technician",
        "VIP",
        "VIN",
        "model",
        "make",
        "color",
        "year",
        "completed",
        "in_progress",
        "id",
    ]

    def get_extra_data(self, o):
        date = json.dumps(o.date, default=str)
        time = json.dumps(o.time, default=str)
        date = json.loads(date)
        date = date.split("-")
        date = f"{date[1]}-{date[2]}-{date[0]}"
        time = json.loads(time)
        t = int(time[0:2])
        if t > 12 and t - 12 >= 10:
            time = f"{t-12}:{time[3:5]} PM"
        elif t > 12:
            time = f"0{t-12}:{time[3:5]} PM"
        elif t > 9:
            time = f"{t}:{time[3:5]} PM"
        else:
            time = f"0{t}:{time[3:5]} AM"

        return {
            "date": date,
            "time": time,
            "technician_name": o.technician.name,
            "str_VIP": str(o.VIP).lower(),
        }

    encoders = {
        "technician": TechnicianEncoder(),
    }
