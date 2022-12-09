from common.json import ModelEncoder
from. models import AutomobileVO, SalesPerson, Customer, SalesRecord

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "color",
        "year",
        "sold"
    ]

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
    ]

class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "sales_person",
        "customer",
        "price",
        "automobile",
        "sold"
    ]
    encoders = {
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
    }
