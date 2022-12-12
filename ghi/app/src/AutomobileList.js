import {useState, useEffect} from 'react';
import {Link} from "react-router-dom"

export default function AutomobileList(){
const [automobiles, setAutomobiles] = useState([])
const [sold_vins, setVins] = useState([])
const [salesRecords,setSalesRecords] = useState([])

const getDataAutomobile = async () => {
    const resp = await fetch('http://localhost:8100/api/automobiles/')
    const data = await resp.json()
    setAutomobiles(data.autos)
}

const getSalesRecordVins = async () => {
  const resp = await fetch('http://localhost:8090/api/sales_records/')
  const data = await resp.json()
  setSalesRecords(data.sales_records)
}

const availFilteredList = () => {
  let sales_vins = salesRecords?.map((sold_vin) => sold_vin.vin)
  let auto_vins = automobiles?.map((automobile) => automobile.vin)
  let filter_term = auto_vins.filter((auto_vin) => !sales_vins.includes(auto_vin))
  return automobiles.filter((automobile) => automobile["vin"].includes(filter_term))
}

const soldFilteredList = () => {
  let sales_vins = salesRecords?.map((sold_vin) => sold_vin.vin)
  let auto_vins = automobiles?.map((automobile) => automobile.vin)
  let filter_term = auto_vins.filter((auto_vin) => !sales_vins.includes(auto_vin))
  return automobiles.filter((automobile) => !automobile["vin"].includes(filter_term))
}

useEffect(()=> {
  getSalesRecordVins();
}, [])

useEffect(()=> {
  getDataAutomobile();
}, [])

return(
  <main>
    <div>
      <h3 className = "text-center">Available Automobile Inventory</h3>
      <table className="table table-hover table-striped">
      <thead className= "text-center thead-light">
        <tr>
          <th>Color</th>
          <th>Year</th>
          <th>VIN</th>
          <th>Model Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody className= "text-center">
      {
      availFilteredList().map(automobile=>{
      return (
        <tr className = "align-middle" key={automobile.id}>
          <td>{automobile.color}</td>
          <td>{automobile.year}</td>
          <td>{automobile.vin}</td>
          <td>{automobile.model.name}</td>
          <td>
          {/* <button className="btn btn-primary m-2" onClick={()=> {handleDeleteAutomobile(automobile.vin)}}>Delete</button> */}
          <Link to="/sales_records/new" className="btn btn-primary m-2" >Purchase</Link>
          </td>
        </tr>
      )}
    )}
      </tbody>
    </table>
    <h3 className = "text-center">All Automobile Inventory</h3>
      <table className="table table-hover table-striped">
      <thead className= "text-center thead-light">
        <tr>
          <th>Color</th>
          <th>Year</th>
          <th>VIN</th>
          <th>Model Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody className= "text-center">
      {
      soldFilteredList().map(automobile=>{
      return (
        <tr className = "align-middle" key={automobile.id}>
          <td>{automobile.color}</td>
          <td>{automobile.year}</td>
          <td>{automobile.vin}</td>
          <td>{automobile.model.name}</td>
          <td>
          {/* <button className="btn btn-primary m-2" onClick={()=> {handleDeleteAutomobile(automobile.vin)}}>Delete</button> */}
          <Link to="/sales_records/" className="btn btn-primary m-2" >Sales Records</Link>
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
