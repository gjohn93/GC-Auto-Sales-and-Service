import { useState, useEffect } from "react";

function ActiveServiceList() {
  let [service_app, setServiceAppointment] = useState([]);
  let [notStartedApp, setNotStartedApp] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [fieldInput, setFieldInput] = useState("VIN");

  const getData = async () => {
    const resp = await fetch("http://localhost:8080/api/service_appointments/");
    const data = await resp.json();
    setServiceAppointment(data.service_appointment);
    setNotStartedApp(data.service_appointment);
  };

  const handleDelete = async (id) => {
    const resp = await fetch(
      `http://localhost:8080/api/service_appointment/${id}`,
      { method: "DELETE" }
    );
    const data = await resp.json();
    getData();
  };

  const handleFieldChange = (e) => {
    e.preventDefault();
    setFieldInput(e.target.value);
  };

  const handleFilterChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleInProgress = async (id) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ in_progress: true }),
    };
    const response = await fetch(
      `http://localhost:8080/api/service_appointment/${id}/`,
      requestOptions
    );
    getData();
  };

  const handleComplete = async (id) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: true }),
    };
    const response = await fetch(
      `http://localhost:8080/api/service_appointment/${id}/`,
      requestOptions
    );
    getData();
  };

  const getActiveFilteredList = () => {
    service_app = service_app.filter(
      (service) => service["in_progress"] === true && service["completed"] === false
    );
    return service_app.filter((service) =>
      service[fieldInput].toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  const getNotStartedFilteredList = () => {
    notStartedApp = notStartedApp.filter(
      (service) => service["in_progress"] === false && service["completed"] === false
    );
    return notStartedApp.filter((service) =>
      service[fieldInput].toLowerCase().includes(searchInput.toLowerCase())
    );
  };
  // getActiveFilteredList();
  // getNotStartedFilteredList();

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
      <h3 className="text-center">Service in progress</h3>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {getActiveFilteredList().map((service) => {
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
                  <td>
                    <button
                      className="btn btn-success m-2"
                      onClick={() => {
                        handleComplete(service.id);
                      }}
                    >
                      Completed
                    </button>
                    <button
                      className="btn btn-danger m-2"
                      onClick={() => {
                        handleDelete(service.id);
                      }}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <h3 className="text-center">Waiting on service</h3>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {getNotStartedFilteredList().map((service) => {
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
                    <td>
                      <button
                        className="btn btn-success m-2"
                        onClick={() => {
                          handleInProgress(service.id);
                        }}
                      >
                        In Progress
                      </button>
                      <button
                        className="btn btn-danger m-2"
                        onClick={() => {
                          handleDelete(service.id);
                        }}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default ActiveServiceList;
