import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AutomobileList() {
  const [avail_automobiles, setAvailAutomobiles] = useState([]);
  const [sold_automobiles, setSoldAutomobiles] = useState([]);

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
    getAvailableAutomobiles();
  };

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
      <div>
        <h3 className="text-center">Available Automobile Inventory</h3>
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
            {avail_automobiles.map((automobile) => {
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
            {sold_automobiles.map((automobile) => {
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
