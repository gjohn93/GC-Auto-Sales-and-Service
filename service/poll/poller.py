import django
import os
import sys
import time
import json
import requests

sys.path.append("/service/api/")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

from service_rest.models import AutomobileVO
# Import models from service_rest, here.
# from service_rest.models import Something
def get_automobiles():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    print(content)
    for automobile in content["automobiles"]:
        AutomobileVO.objects.update_or_create(
            color=automobile["color"],
            year=automobile["year"],
            vin=automobile["vin"],
            model=automobile["model"]["name"]
        )

# def get_sales_record():
#     response = requests.get("http://sales-api:8000/api/sales_records/")
#     content = json.loads(response.content)
#     print(content)
#     for sale_record in content["sales_records"]:
#         SalesRecordVO.objects.update_or_create(
#             price=sale_record["price"],
#             sales_person=sale_record["sales_person"],
#             customer=sale_record["customer"],
#             vin=sale_record["automobile"]["vin"]
#         )

def poll():
    while True:
        print('Service poller polling for data')
        try:
            # Write your polling logic, here
            get_automobiles()
            # get_sales_record()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(10)


if __name__ == "__main__":
    poll()
