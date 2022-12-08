import {useState, useEffect} from 'react';

function ServiceList() {
  const [service_app, setServiceAppointment] = useState([])

  const getData = async () => {
    const resp = await fetch('http://localhost:8080/api/service_appointments/')
    const data = await resp.json()
    setServiceAppointment(data.service_appointment)
    console.log(data.service_appointment)
  }
  console.log(service_app)

  const handleDelete = async (id) => {
    const resp = await fetch(`http://localhost:8080/api/service/${id}`, { method:"DELETE"})
    const data = await resp.json()
    getData()
    window.location = "/service"
  }

  const vinData = async (VIN) => {
    const vinResp = await fetch(`http://localhost:8080/api/service_appointments/${VIN}`)
    const vdata = await vinResp.json()
    vinData()
    window.location = '/service'
  }

  useEffect(()=> {
    getData();
  }, [])


  return (
        <table className="table table-hover table-striped">
          <thead className= "text-center">
            <tr>
              <th>VIP</th>
              <th>Customer Name</th>
              <th>Date/Time</th>
              <th>Description</th>
              <th>Model</th>
              <th>Make</th>
              <th>Year</th>
              <th>Color</th>
              <th>Technician</th>
              <th>VIN</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className= "text-center">
          {
          service_app.map(service=>{
          return (
            <tr className = "align-middle" key={service.id}>
              <td>{String(service.VIP)}</td>
              <td>{service.customer_name }</td>
              <td>{service.date_time }</td>
              <td>{service.description }</td>
              <td>{service.model }</td>
              <td>{service.make }</td>
              <td>{service.year }</td>
              <td>{service.color }</td>
              <td>{service.technician.name }</td>
              <td>{service.VIN }</td>
              <td>
              <button className="btn btn-primary m-2" onClick={()=> {handleDelete(service.id)}}>Delete</button>
              <button className="btn btn-primary m-2">Completed</button>
              </td>
            </tr>
          )}
        )}
          </tbody>
        </table>
      )
}

export default ServiceList;
