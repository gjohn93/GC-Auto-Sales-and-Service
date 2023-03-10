import { useState, useEffect } from "react";
import React from "react";
import "./index.css";

function SalesRecordList() {
  const [salesRecords, setSalesRecords] = useState([]);
  const [sales_person, setSalesPerson] = useState([]);
  const [filter_person, setFilterPerson] = useState("");

  const getData = async () => {
    const resp = await fetch("http://localhost:8090/api/sales_records/");
    const data = await resp.json();
    setSalesRecords(data.sales_records);
  };
  useEffect(() => {
    getData();
  }, []);

  const getSalesPersons = async () => {
    const url = await fetch("http://localhost:8090/api/sales_persons/");
    const data = await url.json();
    setSalesPerson(data.sales_persons);
  };

  useEffect(() => {
    getSalesPersons();
  }, []);

  const handleDelete = async (id) => {
    const resp = await fetch(`http://localhost:8090/api/sales_record/${id}`, {
      method: "DELETE",
    });
    const data = await resp.json();
    getData();
    window.location = "/sales_records";
  };

  const handleSalesPersonChange = (e) => {
    e.preventDefault();
    setFilterPerson(e.target.value);
    console.log(sales_person);
  };

  const getFilteredList = () => {
    if (filter_person !== "") {
      return salesRecords.filter((salesRecord) =>
        salesRecord["sales_person"]["name"].includes(filter_person)
      );
    } else {
      return salesRecords;
    }
  };

  return (
    <main>
      <div>
        <h3>Filter by Sales Person</h3>
        <select onChange={handleSalesPersonChange} className="form-select">
          <option value="">Choose a sales person</option>
          {sales_person.map((salesperson) => {
            return (
              <option key={salesperson.id} value={salesperson.name}>
                {salesperson.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <h3 className="text-center">Sales Records</h3>
        <table className="table table-hover table-striped">
          <thead className="text-center">
            <tr className="header">
              <th>Price</th>
              <th>Automobile</th>
              <th>Sales Person</th>
              <th>Customer</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {getFilteredList().map((salesRecord) => {
              return (
                <tr className="align-middle" key={salesRecord.id}>
                  <td>{salesRecord.price}</td>
                  <td>{salesRecord.automobile.vin}</td>
                  <td>{salesRecord.sales_person.name}</td>
                  <td>{salesRecord.customer.name}</td>
                  <td>
                    <button
                      className="btn btn-primary m-2"
                      onClick={() => {
                        handleDelete(salesRecord.id);
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
      </div>
    </main>
  );
}

export default SalesRecordList;
