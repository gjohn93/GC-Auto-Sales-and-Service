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
            sales_person = SalesPerson.objects.get(name=content["sales_person"])
            content["sales_person"] = sales_person
        except SalesPerson.DoesNotExist:
            response = JsonResponse(
                {"message": "sales person does not exist"}
            )
        try:
            customer =Customer.objects.get(name=content["customer"])
            content["customer"] = customer
        except Customer.DoesNotExist:
            response = JsonResponse(
                {"message": "customer does not exist"}
            )
        try:
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            response = JsonResponse(
                {"message": "automovile does not exist"}
            )
        try:
            sales_record = SalesRecord.objects.create(**content)
            return JsonResponse(
                sales_record,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the sales record"}
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
