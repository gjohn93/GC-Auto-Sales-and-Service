from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .encoders import (
    AutomobileVOEncoder,
    SalesPersonEncoder,
    CustomerEncoder,
    SalesRecordEncoder,
)
from .models import AutomobileVO, SalesPerson, Customer, SalesRecord
# Create your views here.

@require_http_methods(["GET", "POST"])
def api_sales_records(request, sales_person_employee_number=None):
    if request.method == "GET":
        if sales_person_employee_number is not None:
            sales_records = SalesRecord.objects.filter(sales_person=sales_person_employee_number)
        else:
            sales_records = SalesRecord.objects.all()
        return JsonResponse(
            {"sales_records": sales_records},
            encoder=SalesRecordEncoder,
        )
    else:
        content = json.loads(request.body)
        try:

            name = content["sales_person"]
            name = SalesPerson.objects.get(name=name)
            content["sales_person"] = name
            name = content["customer"]
            name =Customer.objects.get(name=name)
            content["customer"] = name
            vin = content["automobile"]
            vin = AutomobileVO.objects.get(vin=vin)
            content["automobile"] = vin
            sales_record = SalesRecord.objects.create(**content)
            return JsonResponse(
                sales_record,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the automobile"}
            )
            response.status_code = 400
            return response

@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the manufacturer"}
            )
            response.status_code = 400
            return response

@require_http_methods(["GET", "POST"])
def api_sales_persons(request):
    if request.method == "GET":
        sales_persons = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_persons": sales_persons},
            encoder=SalesPersonEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = SalesPerson.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the manufacturer"}
            )
            response.status_code = 400
            return response
