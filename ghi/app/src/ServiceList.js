import {useState, useEffect} from 'react';

function ServiceList(props) {
  console.log(props)
  const [service_appointments, setShoes] = useState([])

  const getData = async () => {
    const resp = await fetch('http://localhost:8080/api/service_appointments/')
    const data = await resp.json()
    setShoes(data)
  }

  const handleDelete = async (id) => {
    const resp = await fetch(`http://localhost:8080/api/service_appointment/${id}`, { method:"DELETE"})
    const data = await resp.json()
    getData()
    window.location = "/service"
  }

  const vinData = async () => {
    const vinResp = await fetch('`http://localhost:8080/api/service_appointments/${VIN}`')
    const data = await vinResp.json()
    getData()
    window.location = '/service'
  }

  useEffect(()=> {
    getData();
  }, [])


  return (
        <table className="table table-hover table-striped">
          <thead className= "text-center">
            <tr>
              <th>Customer Name</th>
              <th>Date/Time</th>
              <th>Description</th>
              <th>Model</th>
              <th>Make</th>
              <th>Year</th>
              <th>Color</th>
              <th>Technician</th>
              <th>VIN</th>
            </tr>
          </thead>
          <tbody className= "text-center">
          {props.service_appointments?.map(appointment => {
          return (
            <tr className = "align-middle" key={appointment.id}>
              <td>{appointment.customer_name }</td>
              <td>{appointment.date_time }</td>
              <td>{appointment.description }</td>
              <td>{appointment.model }</td>
              <td>{appointment.make }</td>
              <td>{appointment.year }</td>
              <td>{appointment.color }</td>
              <td>{appointment.technician }</td>
              <td>{appointment.VIN }</td>
              {/* <td>
                <div>
                  <img src={shoe.picture_url} className="rounded mx-auto d-block text-center" alt="picture_url" style={{ width: 200, height: 200 }} />
                </div>
              </td> */}
              <td>
              <button className="btn btn-primary m-2" onClick={()=> {handleDelete(appointment.id)}}>Delete</button>
              </td>
            </tr>
          );
        })}
          </tbody>
        </table>
      )
}

export default ServiceList;
