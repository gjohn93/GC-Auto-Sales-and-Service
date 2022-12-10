import {useState, useEffect} from 'react';

export default function AutomobileList(){
const [automobiles, setAutomobiles] = useState([])

const getDataAutomobile = async () => {
    const resp = await fetch('http://localhost:8100/api/automobiles/')
    const data = await resp.json()
    setAutomobiles(data.autos)
}

const handleDeleteAutomobile = async (vin) => {
    const resp = await fetch(`http://localhost:8100/api/automobiles/${vin}`, { method:"DELETE"})
    const data = await resp.json()
    getDataAutomobile()
  }

  useEffect(()=> {
    getDataAutomobile();
  }, [])

return(
    <div>
      <h3 className = "text-center">Automobiles</h3>
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
      automobiles.map(automobile=>{
      return (
        <tr className = "align-middle" key={automobile.id}>
          <td>{automobile.color}</td>
          <td>{automobile.year}</td>
          <td>{automobile.vin}</td>
          <td>{automobile.model.name}</td>
          <td>
          <button className="btn btn-primary m-2" onClick={()=> {handleDeleteAutomobile(automobile.vin)}}>Delete</button>
          </td>
        </tr>
      )}
    )}
      </tbody>
    </table>
    </div>
)
      }
