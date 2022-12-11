import React, {useState, useEffect} from 'react'

export default class ServiceAppointmentForm extends React.Component {
  state = {
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
  technicians:[],
  }

  handleCustomerNameChange = (event)=>{
      const value = event.target.value
      this.setState({customer_name:value})}

  handleDateChange = (event)=>{
      const value = event.target.value
      this.setState({date:value})}

  handleTimeChange = (event)=>{
    const value = event.target.value
    this.setState({time:value})}

  handleDescriptionChange = (event)=>{
      const value = event.target.value
      this.setState({description:value})}

  handleVINChange = (event)=>{
      const value = event.target.value
      this.setState({VIN:value})}

  handleModelChange = (event)=>{
      const value = event.target.value
      this.setState({model:value})}

  handleMakeChange = (event)=>{
      const value = event.target.value
      this.setState({make:value})}

  handleColorChange = (event)=>{
      const value = event.target.value
      this.setState({color:value})}

  handleYearChange = (event)=>{
      const value = event.target.value
      this.setState({year:value})}

  handleTechnicianChange = (event)=>{
      const value = event.target.value
      this.setState({technician:value})}


  handleFormSubmit = async (event) => {
    event.preventDefault()
    const data = {...this.state}
    delete data.technicians
    console.log(data)

    const serviceAppointmentUrl = `http://localhost:8080/api/service_appointments/`;
    const fetchConfig = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}}

    const response = await fetch(serviceAppointmentUrl, fetchConfig)

  if (response.ok){
    const newAppointment = await response.json()
    console.log(newAppointment)

    const cleared ={
        customer_name: '',
        date:'',
        time:'',
        description:'',
        VIN:'',
        model: '',
        make:'',
        color:'',
        year:'',
        technician:''}
    this.setState(cleared)
    window.location = "/service/new"}
  else{
      console.log("An error has occurred")
  }
}
async componentDidMount(){
    const url = 'http://localhost:8080/api/technicians/'
    const response = await fetch(url)

    if (response.ok){
        const data = await response.json()
        this.setState({technicians:data.technicians})}
}

render(){
    return(
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new service appointment</h1>
            <form onSubmit = {this.handleFormSubmit} id="create-shoe-form">
              <div className="form-floating mb-3">
                <input onChange ={this.handleCustomerNameChange} value = {this.state.customer_name}  placeholder="Customer Name" required type="text" name="customer_name" id="customer_name" className="form-control"/>
                <label htmlFor="customer_name">Customer name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange ={this.handleDateChange} value = {this.state.date} placeholder="Date" required type="date" name="date" id="date" className="form-control"/>
                <label htmlFor="date">Date</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange ={this.handleTimeChange} value = {this.state.time} placeholder="Time" required type="time" name="time" id="time" className="form-control"/>
                <label htmlFor="time">Time</label>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea onChange ={this.handleDescriptionChange} value = {this.state.description} className="form-control" name= "description" id="description" rows="3"></textarea>
              </div>
              <div className="form-floating mb-3">
                <input onChange ={this.handleColorChange} value = {this.state.color} placeholder="Color" type="text" name="color" id="color" className="form-control"/>
                <label htmlFor="color">Vehicle Color</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange ={this.handleMakeChange} value = {this.state.make} placeholder="Make" required type="text" name="make" id="make" className="form-control"/>
                <label htmlFor="make">Make</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange ={this.handleModelChange} value = {this.state.model} placeholder="Model" required type="text" name="model" id="model" className="form-control"/>
                <label htmlFor="model">Model</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange ={this.handleYearChange} value = {this.state.year} placeholder="Year" required type="text" name="year" id="year" className="form-control"/>
                <label htmlFor="model">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange ={this.handleVINChange} value = {this.state.VIN} placeholder="VIN" required type="text" name="VIN" id="VIN" className="form-control"/>
                <label htmlFor="model">VIN</label>
              </div>
              <div className="mb-3">
                <select onChange ={this.handleTechnicianChange} value = {this.state.technician} required id="technician" name= "technician" className="form-select">
                  <option value="">Choose a technician</option>
                    {this.state.technicians.map(technician => {
                      return (
                        <option key={technician.employee_number} value={technician.employee_number}>
                          {technician.name}
                        </option>)
                    })};
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
}















    }
