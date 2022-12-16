import django
import os
import sys
import time
import json
import requests

sys.path.append("/sales/api/")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something
from sales_rest.models import AutomobileVO


def get_automobiles():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    print(content)
    for automobile in content["autos"]:
        AutomobileVO.objects.update_or_create(
            color=automobile["color"],
            year=automobile["year"],
            vin=automobile["vin"],
        )
    for automobile in AutomobileVO.objects.all():
        is_present = False
        for auto in content["autos"]:
            if auto["vin"] == automobile.vin:
                is_present = True
            else:
                automobile.delete()



def poll():
    while True:
        print('Sales poller polling for data')
        try:
            get_automobiles()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(10)


if __name__ == "__main__":
    poll()
