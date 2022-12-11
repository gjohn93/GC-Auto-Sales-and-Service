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
    for automobile in content["autos"]:
        AutomobileVO.objects.update_or_create(
            color=automobile["color"],
            year=automobile["year"],
            vin=automobile["vin"],
            model=automobile["model"]["name"],
        )


def poll():
    while True:
        print("Service poller polling for data")
        try:
            # Write your polling logic, here
            get_automobiles()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(10)


if __name__ == "__main__":
    poll()
