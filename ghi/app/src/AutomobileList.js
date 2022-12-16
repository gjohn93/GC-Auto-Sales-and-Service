import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AutomobileList() {
  const [avail_automobiles, setAvailAutomobiles] = useState([]);
  const [sold_automobiles, setSoldAutomobiles] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [fieldInput, setFieldInput] = useState("model");

  const getAvailableAutomobiles = async () => {
    const resp = await fetch(
      "http://localhost:8090/api/available_automobiles/"
    );
    const data = await resp.json();
    setAvailAutomobiles(data.availAutos);
  };

  const getSoldAutomobiles = async () => {
    const resp = await fetch("http://localhost:8090/api/sold_automobiles/");
    const data = await resp.json();
    setSoldAutomobiles(data.soldAutos);
  };

  const handleDeleteAutomobile = async (vin) => {
    const resp = await fetch(`http://localhost:8100/api/automobiles/${vin}`, {
      method: "DELETE",
    });
    const data = await resp.json();
    // getAvailableAutomobiles();
    setAvailAutomobiles(avail_automobiles.filter((auto) => auto.vin !== vin));
  };

  const handleFieldChange = (e) => {
    e.preventDefault();
    setFieldInput(e.target.value);
  };

  const handleFilterChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const getAvailFilteredList = () => {
    console.log(avail_automobiles);
    return avail_automobiles.filter((automobile) => String((automobile[fieldInput])).toLowerCase().includes(searchInput.toLowerCase()));
  }

  const getSoldFilteredList = () => {
    console.log(sold_automobiles)
    return sold_automobiles.filter((automobile) => String((automobile[fieldInput])).toLowerCase().includes(searchInput.toLowerCase()));
  }

  useEffect(() => {
    getSoldAutomobiles();
  }, []);
  console.log(sold_automobiles);
  useEffect(() => {
    getAvailableAutomobiles();
  }, []);
  console.log(avail_automobiles);

  return (
    <main>
      <h3>Filter</h3>
        <div className='search-wrapper'>
        <select onChange={handleFieldChange}>
          <option value="model">Model</option>
          <option value="vin">VIN</option>
          <option value="year">Year</option>
          <option value="color">Color</option>
        </select>
        <input id="searchBar" onChange ={handleFilterChange} type="search" placeholder="Search here"/>
        </div>
      <h3></h3>
      <div>
        <h3 className="text-center">Available Automobile Inventory</h3>
        <table className="table table-hover table-striped">
          <thead className="text-center thead-light">
            <tr className="header">
              <th>Color</th>
              <th>Year</th>
              <th>VIN</th>
              <th>Model</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center">
            {getAvailFilteredList().map((automobile) => {
              return (
                <tr className="align-middle" key={automobile.id}>
                  <td>{automobile.color}</td>
                  <td>{automobile.year}</td>
                  <td>{automobile.vin}</td>
                  <td>{automobile.model}</td>
                  <td>
                    <Link
                      to="/sales_records/new"
                      className="btn btn-success m-2"
                    >
                      Purchase
                    </Link>
                    <button
                      className="btn btn-danger m-2"
                      onClick={() => {
                        handleDeleteAutomobile(automobile.vin);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h3 className="text-center">Sold Automobile Inventory</h3>
        <table className="table table-hover table-striped">
          <thead className="text-center thead-light">
            <tr>
              <th>Color</th>
              <th>Year</th>
              <th>VIN</th>
              <th>Model</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center">
            {getSoldFilteredList().map((automobile) => {
              return (
                <tr className="align-middle" key={automobile.id}>
                  <td>{automobile.color}</td>
                  <td>{automobile.year}</td>
                  <td>{automobile.vin}</td>
                  <td>{automobile.model}</td>
                  <td>
                    <Link to="/sales_records/" className="btn btn-primary m-2">
                      Sales Records
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
