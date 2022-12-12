# CarCar

Team:

* Gina John - Service
* Corey Schanz - Sales

## Design
We designed CarCar to handle the inventory, sales and service of a car dealership. It has the functionality to create and delete manufacturers, vehicle models, and automobiles for the inventory microservice. We needed both sales and service microservices to be able to get information from the inventory microservice, so we have pollers on the sales and service microservices to the inventory microservice. Some unique features we have in our backend are a true/false Boolean for VIP status that is displayed on the Service List page, an auto filtering feature where the table filters as the user types for searching by VIN numbers and other available fields, a filter on the Sales Record page by sales person, and a list on the Inventory list page that shows available vs sold inventory. For a visual representation of our design concept, please see the provided excalidraw image provided in the CarCarExcalidraw.png file.

## Service microservice

The service microservice has models for Technician, AutomobileVO, and ServiceAppointments. All of these models have all CRUD functionality built on the backend Django service, but they are provided on the frontend on an as needed basis. We polled from the Inventory Microservice to create an AutomobileVO which provided the VIN number. The VIN number that came from Automobile was used for VIP status since if a car was sold, it had to be in Inventory at some point. Since the cars that came in to Service were not necessarily the same cars that were in Inventory, the only thing I needed to compare in the Automobile VO was the VIN. Using the ServiceAppointment Model, we are able to filter by certain fields including VIN, VIP status, date and time of appointment, etc. using a search bar that autofilters as the user types.

## Sales microservice
The sales microservice is designed to handle the creation of customers, sales people and sales records. It has a poller that recieves data from the inventory microservice. With the data that is received from the inventory, we can create sales records that are associated with specific vehicles, customers and sales people. We have it set up so that you cannot create duplicate sales records associated with the same vehicle. If you attempt this it renders and error that is visible to the user in the browser. We also created the ability to filter the list of sales records so that you can see each sale by a specific sales person.
