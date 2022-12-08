from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from .models import Technician, ServiceAppointment, AutomobileVO
from .encoders import  TechnicianEncoder, ServiceAppointmentEncoder
# Create your views here.

@require_http_methods(["GET","POST"])
def api_technicians(request):
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
def api_technician(request, id):
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

@require_http_methods(["GET","POST"])
def api_service_appointments(request):
    if request.method == "GET":
        service_appointment = ServiceAppointment.objects.all()
        return JsonResponse(
            {"service_appointment":service_appointment},
            encoder = ServiceAppointmentEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(employee_number = content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"Note":"Technician employee number invalid. Please enter correct employee number"},
                status=400,
            )
        if AutomobileVO.objects.get(vin = content["vin"]):
            content["VIP"] = "True"
        service_appointment = ServiceAppointment.objects.create(**content)
        return JsonResponse(
            service_appointment,
            encoder= ServiceAppointmentEncoder,
            safe = False
        )

@require_http_methods(["GET","DELETE", "PUT"])
def api_service_appointment(request, id):
    if request.method == "GET":
        try:
            service_appointment = ServiceAppointment.objects.get(id=id)
            return JsonResponse(
                service_appointment,
                encoder=ServiceAppointmentEncoder,
                safe = False
            )
        except ServiceAppointment.DoesNotExist:
            return JsonResponse(
                {"Note": "Invalid appointment id number. Please enter a correct number"}, status=400
            )
    if request.method == "DELETE":
        try:
            service_appointment
