import { redirect } from 'react-router-dom'
import {useState, useEffect} from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


function SalesRecordList() {
  const [salesRecords, setSalesRecords] = useState([])


  const getData = async () => {
    const resp = await fetch('http://localhost:8090/api/sales_records/')
    const data = await resp.json()
    setSalesRecords(data.sales_records)
  }

  const handleDelete = async (id) => {
    const resp = await fetch(`http://localhost:8090/api/sales_records/${id}`, { method:"DELETE"})
    const data = await resp.json()
    getData()
    window.location = "/sales_records"
  }

  useEffect(()=> {
    getData();
  }, [])

    return(
        <table className="table table-hover table-striped">
        <thead className='text-center'>
          <tr>
            <th>Price</th>
            <th>Automobile</th>
            <th>Sales Person</th>
            <th>Customer</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {salesRecords?.map(salesRecord => {
            return (
              <tr className='align-middle' key={salesRecord.id}>
                <td>{ salesRecord.price }</td>
                <td>{ salesRecord.automobile.vin }</td>
                <td>{ salesRecord.sales_person.name }</td>
                <td>{ salesRecord.customer.name }</td>
                <td>
                <button className="btn btn-primary m-2" onClick={()=> {handleDelete(salesRecord.id)}}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
}

export default SalesRecordList;
