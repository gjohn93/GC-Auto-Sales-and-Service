import {useState, useEffect} from 'react';
import React from 'react';
import './index.css';


function CustomerList() {
  const [customers, setCustomers] = useState([])

  const getData = async () => {
    const resp = await fetch('http://localhost:8090/api/customers/')
    const data = await resp.json()
    setCustomers(data.customers)
  }

  useEffect(()=> {
    getData();
  }, [])

    return(
        <table className="table table-hover table-striped">
        <thead className='text-center'>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {customers?.map(customer => {
            return (
              <tr className='align-middle' key={customer.id}>
                <td>{ customer.name }</td>
                <td>{ customer.address }</td>
                <td>{ customer.phone_number }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
}

export default CustomerList;
