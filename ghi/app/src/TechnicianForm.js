import React from "react";
//import loadData from "./index"

class TechnicianForm extends React.Component {
  state = {
    name: "",
    employee_number: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...this.state };
    delete data.models;

    const technicianUrl = "http://localhost:8080/api/technicians/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(technicianUrl, fetchConfig);

    if (response.ok) {
      const newAutomobile = await response.json();
      console.log(newAutomobile);
      const cleared = {
        name: "",
        employee_number: "",
      };
      this.setState(cleared);
    } else {
      console.log("an error has occurred");
    }
  };
  handleNameChange = (event) => {
    const value = event.target.value;
    this.setState({ name: value });
  };
  handleEmployeeNumberChange = (event) => {
    const value = event.target.value;
    this.setState({ employee_number: value });
  };

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new technician</h1>
            <form onSubmit={this.handleSubmit} id="create-hat-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleNameChange}
                  placeholder="name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  value={this.state.name}
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleEmployeeNumberChange}
                  placeholder="employee_number"
                  required
                  type="text"
                  name="employee_number"
                  id="employee_number"
                  className="form-control"
                  value={this.state.employee_number}
                />
                <label htmlFor="employee_number">Employee Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TechnicianForm;
