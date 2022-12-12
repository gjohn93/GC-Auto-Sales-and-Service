import {useState, useEffect} from 'react';

function InventoryList() {
    const [manufacturers, setManufacturers] = useState([])
    const [models, setModels] = useState([])
    const [automobiles, setAutomobiles] = useState([])

    const getDataMFG = async () => {
      const resp = await fetch('http://localhost:8100/api/manufacturers/')
      const data = await resp.json()
      setManufacturers(data.manufacturers)
    }

    const handleDeleteMFG = async (pk) => {
        const resp = await fetch(`http://localhost:8100/api/manufacturers/${pk}`, { method:"DELETE"})
        const data = await resp.json()
        getDataMFG()
        window.location = "/inventory_list"
      }

    const getDataModel = async () => {
        const resp = await fetch('http://localhost:8100/api/models/')
        const data = await resp.json()
        setModels(data.models)
      }

      const handleDeleteModel = async (pk) => {
        const resp = await fetch(`http://localhost:8100/api/models/${pk}`, { method:"DELETE"})
        const data = await resp.json()
        getDataModel()
        window.location = "/inventory_list"
      }

    const getDataAutomobile = async () => {
        const resp = await fetch('http://localhost:8100/api/automobiles/')
        const data = await resp.json()
        setAutomobiles(data.autos)
    }

    const handleDeleteAutomobile = async (vin) => {
        const resp = await fetch(`http://localhost:8100/api/automobiles/${vin}`, { method:"DELETE"})
        const data = await resp.json()
        getDataAutomobile()
        window.location = "/inventory_list"
      }
    useEffect(()=> {
        getDataMFG();
      }, [])

      useEffect(()=> {
        getDataModel();
      }, [])

      useEffect(()=> {
        getDataAutomobile();
      }, [])

      return (
        <main>
        <h1> Inventory List</h1>
        <h3 className = "text-center">Manufacturers</h3>
        <table className="table table-hover table-striped">
          <thead className= "text-center thead-light">
            <tr>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody className= "text-center">
          {
          manufacturers.map(manufacturer=>{
          return (
            <tr className = "align-middle" key={manufacturer.id}>
              <td>{manufacturer.name}</td>
              <td>
              <button className="btn btn-primary m-2 float-right" onClick={()=> {handleDeleteMFG(manufacturer.id)}}>Delete</button>
              <button className="btn btn-primary m-2 float-right">Purchase</button>
              </td>
            </tr>
          )}
        )}
        </tbody>
        </table>
        <h3 className = "text-center">Models</h3>
        <table className="table table-hover table-striped">
        <thead className= "text-center thead-light">
          <tr>
            <th>Name</th>
            <th>Picture</th>
            <th></th>
          </tr>
        </thead>
        <tbody className= "text-center">
        {
        models.map(model=>{
        return (
          <tr className = "align-middle" key={model.id}>
            <td>{model.name}</td>
            <td> <img src ={model.picture_url} style={{ width: 200, height: 200 }}/></td>
            <td>
            <button className="btn btn-primary m-2" onClick={()=> {handleDeleteModel(model.id)}}>Delete</button>
            <button className="btn btn-primary m-2">Edit</button>
            </td>
          </tr>
        )}
      )}
        </tbody>
      </table>
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
          <button className="btn btn-primary m-2">Edit</button>
          </td>
        </tr>
      )}
    )}
      </tbody>
    </table>
    </main>
      )
}

export default InventoryList;
