from common.json import ModelEncoder
from. models import AutomobileVO, SalesPerson, Customer, SalesRecord

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "color",
        "year",
    ]

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
        "id",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
        "id",
    ]

class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "sales_person",
        "customer",
        "price",
        "automobile",
        "id",
    ]
    encoders = {
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
    }
