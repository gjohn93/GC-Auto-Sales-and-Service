import React from "react";

export default class SalesPersonForm extends React.Component {
  state = {
    name: "",
    employee_number: "",
  };

  handleNameChange = (event) => {
    const value = event.target.value;
    this.setState({ name: value });
  };

  handleEmployeeNumberChange = (event) => {
    const value = event.target.value;
    this.setState({ employee_number: value });
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = { ...this.state };
    console.log(data);

    const salesPersonUrl = "http://localhost:8090/api/sales_persons/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(salesPersonUrl, fetchConfig);

    if (response.ok) {
      const newSalesPerson = await response.json();
      console.log(newSalesPerson);

      const cleared = {
        name: "",
        employee_number: "",
      };
      this.setState(cleared);
      window.location = "/sales_persons/new";
    } else {
      console.log("An error has occurred");
    }
  };

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new salesperson</h1>
            <form onSubmit={this.handleFormSubmit} id="create-hat-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleNameChange}
                  placeholder="Name"
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
                  value={this.state.employeeNumber}
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
