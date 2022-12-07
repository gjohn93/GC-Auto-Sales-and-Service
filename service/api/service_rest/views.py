from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from .models import Technician, SalesRecordVO, AutomobileVO, ServiceAppointment
from .encoders import SalesRecordVOEncoder, TechnicianEncoder, AutomobileVOEncoder, ServiceAppointmentEncoder
# Create your views here.

@require_http_methods(["GET","POST"])
def api_list_technicians(request):
    if request.method=="GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder = TechnicianEncoder,
            safe=False
        )

@require_http_methods(["GET","DELETE","PUT"])
def api_show_technicians(request, id):
    if request.method == "GET":
        technician = Technician.objects.get(employee_number=id)
        return JsonResponse(
            {"technician": technician}, encoder = TechnicianEncoder,safe=False,
            json_dumps_params=None)
    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(employee_number = id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        Technician.objects.filter(employee_number=id).update(**content)
        technician = Technician.objects.get(employee_number=id)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False
        )
