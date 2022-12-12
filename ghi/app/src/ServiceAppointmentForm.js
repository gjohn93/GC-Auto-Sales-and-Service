import React, {useState, useEffect} from 'react'

export default function ServiceAppointmentForm(){
 const initialData = {
  customer_name: '',
  date:'',
  time:'',
  description:'',
  VIN:'',
  model: '',
  make:'',
  color:'',
  year:'',
  technician:'',
  }

const [formData, setFormData] = useState(initialData)
const [technicians, setTechnicians] = useState([])
const [errorMessage, setErrorMessage] = useState('')

const handleChange = (e)=>
  setFormData(
    {
      ...formData,
      [e.target.name]:e.target.value
      })

const getTechnicians = async () => {
  const url = await fetch('http://localhost:8080/api/technicians/')
  if (url.ok){
    const data = await url.json()
    setTechnicians(data.technicians)}
  else{
    setErrorMessage("Technicians are unavilable")
  }
}
useEffect(() => {getTechnicians()},[])

const handleFormSubmit = async e => {
  e.preventDefault()
  const serviceAppointmentUrl = `http://localhost:8080/api/service_appointments/`;
  const fetchConfig = {
      method: 'post',
      body: JSON.stringify(formData),
      headers: {'Content-Type': 'application/json'}}

  const response = await fetch(serviceAppointmentUrl, fetchConfig)

  if (response.ok){
    const newAppointment = await response.json()
    console.log(newAppointment)
    setFormData(initialData)
    window.location = "/service/new"}
  else{
      setErrorMessage("This form cannot be submitted. Please review form for correct data.")
  }
}

return(
    <div className="row">
    <div className="offset-3 col-6">
      <div className="shadow p-4 mt-4">
        <h1>Create a new service appointment</h1>
        <form onSubmit = {handleFormSubmit} id="create-shoe-form">
          <div className="form-floating mb-3">
            <input onChange ={handleChange} value = {formData.customer_name}  placeholder="Customer Name" required type="text" name="customer_name" id="customer_name" className="form-control"/>
            <label htmlFor="customer_name">Customer name</label>
          </div>
          <div className="form-floating mb-3">
            <input onChange ={handleChange} value = {formData.date} placeholder="Date" required type="date" name="date" id="date" className="form-control"/>
            <label htmlFor="date">Date</label>
          </div>
          <div className="form-floating mb-3">
            <input onChange ={handleChange} value = {formData.time} placeholder="Time" required type="time" name="time" id="time" className="form-control"/>
            <label htmlFor="time">Time</label>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea onChange ={handleChange} value = {formData.description} className="form-control" name= "description" id="description" rows="3"></textarea>
          </div>
          <div className="form-floating mb-3">
            <input onChange ={handleChange} value = {formData.color} placeholder="Color" type="text" name="color" id="color" className="form-control"/>
            <label htmlFor="color">Vehicle Color</label>
          </div>
          <div className="form-floating mb-3">
            <input onChange ={handleChange} value = {formData.make} placeholder="Make" required type="text" name="make" id="make" className="form-control"/>
            <label htmlFor="make">Make</label>
          </div>
          <div className="form-floating mb-3">
            <input onChange ={handleChange} value = {formData.model} placeholder="Model" required type="text" name="model" id="model" className="form-control"/>
            <label htmlFor="model">Model</label>
          </div>
          <div className="form-floating mb-3">
            <input onChange ={handleChange} value = {formData.year} placeholder="Year" required type="text" name="year" id="year" className="form-control"/>
            <label htmlFor="model">Year</label>
          </div>
          <div className="form-floating mb-3">
            <input onChange ={handleChange} value = {formData.VIN} placeholder="VIN" required type="text" name="VIN" id="VIN" className="form-control"/>
            <label htmlFor="model">VIN</label>
          </div>
          <div className='error'>
              { errorMessage }
            </div>
          <div className="mb-3">
            <select onChange ={handleChange} value = {formData.technician} required id="technician" name= "technician" className="form-select">
              <option value="">Choose a technician</option>
                {technicians.map(technician => {
                  return (
                    <option key={technician.employee_number} value={technician.employee_number}>
                      {technician.name}
                    </option>)
                })};
            </select>
          </div>
          <div className='error'>
              { errorMessage }
            </div>
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  </div>
)
}
