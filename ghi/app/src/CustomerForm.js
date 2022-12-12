import React from 'react';

export default class CustomerForm extends React.Component {
        state = {
          name: '',
          address: '',
          phone_number: '',
        }

  handleNameChange = (event)=>{
    const value = event.target.value
    this.setState({name:value})}

  handleAddressChange = (event)=>{
    const value = event.target.value
    this.setState({address:value})}

  handlePhoneNumberChange = (event)=>{
    const value = event.target.value
    this.setState({phone_number:value})}

  handleFormSubmit = async (event) => {
    event.preventDefault()
    const data = {...this.state}
    console.log(data)


  const customerUrl = 'http://localhost:8090/api/customers/';
  const fetchConfig = {
    method: "post",
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}
  };

  const response = await fetch(customerUrl, fetchConfig)

  if (response.ok){
    const newCustomer = await response.json()
    console.log(newCustomer)

    const cleared = {
      name: '',
      address: '',
      phone_number: '',
    }
    this.setState(cleared)
    window.location = "/customers/new"
  }

  else{
    console.log("An error has occurred")
  }}

render() {
    return (
    <div className="row">
    <div className="offset-3 col-6">
      <div className="shadow p-4 mt-4">
        <h1>Create a new customer</h1>
        <form onSubmit={this.handleFormSubmit} id="create-hat-form">
          <div className="form-floating mb-3">
            <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="id" className="form-control" value={this.state.name}/>
            <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
            <input onChange={this.handlePhoneNumberChange} placeholder="phone_number" required type="text" name="phone_number" id="phone_number" className="form-control" value={this.state.phoneNumber}/>
            <label htmlFor="phone_number">Phone Number</label>
            </div>
            <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <textarea onChange ={this.handleAddressChange} value = {this.state.address} className="form-control" name= "address" id="address" rows="3"></textarea>
            </div>
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  </div>

    );
}
}
