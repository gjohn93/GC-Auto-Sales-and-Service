# CarCar

Team:

* Gina John - Service
* Corey Schanz - Sales

## Design

We chose to

## Service microservice

The service microservice has models for Technician, AutomobileVO, and ServiceAppointments. All of these models have all CRUD functionality built on the backend Django service, but they are provided on the frontend on as needed basis. We polled from the Inventory Microservice to create an AutomobileVO which provided the VIN number. The VIN number that came from Automobile was used for VIP status since if a car was sold, it had to be in Inventory at some point. Since the cars that came in to Service were not necessarily the same cars that were in Inventory, the only thing I needed to compare in the Automobile VO was the VIN. Using the ServiceAppointment Model, we are able to filter by certain fields including VIN, VIP status, date and time of appointment, etc. using a search bar that autofilters as the user types.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
