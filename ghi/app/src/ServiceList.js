import {useState, useEffect} from 'react';

function ServiceList() {
  const [service_app, setServiceAppointment] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [fieldInput, setFieldInput] = useState("VIN")

  const getData = async () => {
    const resp = await fetch('http://localhost:8080/api/service_appointments/')
    const data = await resp.json()
    setServiceAppointment(data.service_appointment)
    console.log(data.service_appointment)
  }
  console.log(service_app)

  const handleDelete = async (id) => {
    const resp = await fetch(`http://localhost:8080/api/service_appointment/${id}`, { method:"DELETE"})
    const data = await resp.json()
    getData()
    window.location = "/service"
  }

  const handleFieldChange = (e) => {
    e.preventDefault();
    setFieldInput(e.target.value);
  };

  const handleFilterChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const getFilteredList = () => {
    return service_app.filter((service) => service[fieldInput].includes(searchInput));
  }

  useEffect(()=> {
    getData();
  }, [])


  return (
    <main>
      <h3>Filter</h3>
      <div className='search-wrapper'>
      <select onChange={handleFieldChange}>
        <option value="VIN"></option>
        <option value="Date"></option>
        <option value="Time"></option>
        <option value="Automobile"></option>
      </select>
        <input id="searchBar" onChange = {handleFilterChange}type="search" placeholder="Search here"/>
        <button className = "btn btn-primary m-2" onClick={getFilteredList()}>Filter </button>
      </div>
    <div>
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
          service_app?.map(service=>{
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
        </div>
        </main>
      )
}

export default ServiceList;
