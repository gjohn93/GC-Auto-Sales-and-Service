# CarCar

Team:

* Gina John - Service
* Corey Schanz - Sales

## Design
We disigned CarCar to handle the inventory, sales and service of a car dealership. It has the functionality to create and delete manufaturers, models, automobiles for the inventory for the inventory microservice. We needed both sales and service microservices to be able to get information from the inventory microservice so we have pollers on the sales and service microservices. For a visual representation of our design concept, please see the provided excalidraw image provided in the CarCarExcalidraw.png file, located in the ghi/app/public folder.
## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice
The sales microservice is designed to handle the creation of customers, sales people and sales records. It has a poller that recieves data from the inventory microservice. With the data that is received from the inventory, we can create sales records that are associated with specific vehicles, customers and sales people. We have it set up so that you cannot create duplicate sales records associated with the same vehicle. If you attempt this it renders and error that is visible to the user in the browser. We also created the ability to filter the list of sales records so that you can see each sale by a specific sales person.
