from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import Technician, ServiceAppointment, AutomobileVO
from .encoders import TechnicianEncoder, ServiceAppointmentEncoder

# Create your views here.


@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        try:
            technicians = Technician.objects.all()
            return JsonResponse(
                {"technicians": technicians}, encoder=TechnicianEncoder)
        except Technician.DoesNotExist:
            return JsonResponse(
                {"Message": "Technicians do not exist"}, status=400
            )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False)
        except Technician.DoesNotExist:
            return JsonResponse(
                {"Message": "Unable to process request"}
            )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_technician(request, id):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(employee_number=id)
            return JsonResponse(
                {"technician": technician},
                encoder=TechnicianEncoder,
                safe=False,
                json_dumps_params=None,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "cannot create technician"}, status=400
            )
    elif request.method == "DELETE":
        try:
            count, _ = Technician.objects.filter(employee_number=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "cannot delete technician"}, status=400
            )
    else:
        try:
            content = json.loads(request.body)
            Technician.objects.filter(employee_number=id).update(**content)
            technician = Technician.objects.get(employee_number=id)
            return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "cannot update technician"}, status=400
            )


@require_http_methods(["GET", "POST"])
def api_service_appointments(request, vin=None):
    if request.method == "GET":
        try:
            if vin is not None:
                service_appointment = ServiceAppointment.objects.filter(VIN=vin)
            else:
                service_appointment = ServiceAppointment.objects.all()
            return JsonResponse(
                {"service_appointment": service_appointment},
                encoder=ServiceAppointmentEncoder,
                safe=False,
            )
        except ServiceAppointment.DoesNotExist:
            return JsonResponse(
                {"message": "cannot get Service Appointment"}, status=400
            )
    else:
        try:
            content = json.loads(request.body)
            try:
                technician = Technician.objects.get(employee_number=content["technician"])
                content["technician"] = technician
            except Technician.DoesNotExist:
                return JsonResponse(
                    {
                        "Note":
                        "Technician employee number invalid. Please enter correct employee number"
                    },
                    status=400,)
            try:
                if AutomobileVO.objects.get(vin=content["VIN"]) is not None:
                    content["VIP"] = True
            except AutomobileVO.DoesNotExist:
                content["VIP"] = False

            service_appointment = ServiceAppointment.objects.create(**content)
            return JsonResponse(
                service_appointment, encoder=ServiceAppointmentEncoder, safe=False
            )
        except ServiceAppointment.DoesNotExist:
            return JsonResponse(
                    {
                        "Note":
                        "Cannot create Service Record"
                    },
                    status=400,)


@require_http_methods(["GET", "DELETE", "PUT"])
def api_service_appointment(request, id):
    if request.method == "GET":
        try:
            service_appointment = ServiceAppointment.objects.get(id=id)
            return JsonResponse(
                service_appointment, encoder=ServiceAppointmentEncoder, safe=False
            )
        except ServiceAppointment.DoesNotExist:
            return JsonResponse(
                {
                    "Note":
                    "Invalid appointment id number. Please enter a correct number"
                },
                status=400,
            )
    elif request.method == "DELETE":
        try:
            service_appointment = ServiceAppointment.objects.get(id=id)
            service_appointment.delete()
            return JsonResponse(
                service_appointment,
                encoder=ServiceAppointmentEncoder,
                safe=False,
            )
        except ServiceAppointment.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        content = json.loads(request.body)
        try:
            if "technician" in content:
                technician = Technician.objects.get(
                    employee_number=content["technician"]
                )
                content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Invalid technician id"}, status=400)

        ServiceAppointment.objects.filter(id=id).update(**content)

        service_appointment = ServiceAppointment.objects.get(id=id)
        return JsonResponse(
            service_appointment, encoder=ServiceAppointmentEncoder, safe=False
        )
