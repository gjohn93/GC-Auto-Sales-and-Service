import { useState, useEffect } from "react";

function ServiceHistoryList() {
  let [completedAppointment, setServiceHistory] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [fieldInput, setFieldInput] = useState("VIN");

  const getData = async () => {
    const resp = await fetch("http://localhost:8080/api/service_appointments/");
    const data = await resp.json();
    setServiceHistory(data.service_appointment);
  };

  const handleFieldChange = (e) => {
    e.preventDefault();
    setFieldInput(e.target.value);
  };

  const handleFilterChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const getFilteredList = () => {
    completedAppointment = completedAppointment.filter((appointment) => appointment["completed"] === true)
    return completedAppointment.filter((service) =>
      service[fieldInput].toLowerCase().includes(searchInput.toLowerCase())
    );
  };

useEffect(() => {
  getData();
}, []);

  return (
    <main>
      <h3>Filter</h3>
      <div className="search-wrapper">
        <select onChange={handleFieldChange}>
          <option value="VIN">VIN</option>
          <option value="date">Date</option>
          <option value="time">Time</option>
          <option value="str_VIP">VIP</option>
          <option value="technician_name">Technician</option>
          <option value="customer_name">Customer Name</option>
          <option value="model">Model</option>
          <option value="description">Description</option>
        </select>
        <input
          id="searchBar"
          onChange={handleFilterChange}
          type="search"
          placeholder="Search here"
        />
      </div>
      <br></br>
      <h3 className="text-center">Service History</h3>
      <div>
        <table className="table table-hover table-striped">
          <thead className="text-center">
            <tr className="header">
              <th>VIP</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Description</th>
              <th>Model</th>
              <th>Make</th>
              <th>Year</th>
              <th>Color</th>
              <th>Technician</th>
              <th>VIN</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {getFilteredList().map((service) => {
              return (
                <tr className="align-middle" key={service.id}>
                  <td>{String(service.VIP)}</td>
                  <td>{service.customer_name}</td>
                  <td>{service.date}</td>
                  <td>{service.time}</td>
                  <td>{service.description}</td>
                  <td>{service.model}</td>
                  <td>{service.make}</td>
                  <td>{service.year}</td>
                  <td>{service.color}</td>
                  <td>{service.technician.name}</td>
                  <td>{service.VIN}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default ServiceHistoryList;
