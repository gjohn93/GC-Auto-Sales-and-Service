from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .encoders import (
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
                {"message": "automobile does not exist"}
            )

        new_vin = SalesRecord.objects.filter(automobile__vin=content["automobile"])
        if new_vin:
            return JsonResponse({"message": "This VIN has already been purchased"}, status=400)
        else:
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

@require_http_methods(["DELETE", "GET", "PUT"])
def api_sales_record(request, id):
    if request.method == "GET":
        try:
            sales_record = SalesRecord.objects.get(id=id)
            return JsonResponse(
                sales_record,
                encoder=SalesRecordEncoder,
                safe=False
            )
        except SalesRecord.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            sales_record = SalesRecord.objects.get(id=id)
            sales_record.delete()
            return JsonResponse(
                sales_record,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except SalesRecord.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            sales_record = SalesRecord.objects.get(id=id)
            props = ["price", "sales_person", "customer", "automobile"]
            for prop in props:
                if prop in content:
                    setattr(sales_record, prop, content[prop])
            sales_record.save()
            return JsonResponse(
                sales_record,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except SalesRecord.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
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

@require_http_methods(["DELETE", "GET", "PUT"])
def api_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=id)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.get(id=id)
            props = ["name", "address", "phone_number",]
            for prop in props:
                if prop in content:
                    setattr(customer, prop, content[prop])
            customer.save()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
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

@require_http_methods(["DELETE", "GET", "PUT"])
def api_sales_person(request, id):
    if request.method == "GET":
        try:
            sales_person = SalesPerson.objects.get(id=id)
            return JsonResponse(
                sales_person,
                encoder=SalesPerson,
                safe=False
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            sales_person = SalesPerson.objects.get(id=id)
            sales_person.delete()
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            sales_person = SalesPerson.objects.get(id=id)
            props = ["name", "employee_number",]
            for prop in props:
                if prop in content:
                    setattr(sales_person, prop, content[prop])
            sales_person.save()
            return JsonResponse(
                sales_person,
                encoder=CustomerEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
