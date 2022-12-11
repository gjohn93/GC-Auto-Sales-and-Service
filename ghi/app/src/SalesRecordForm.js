import React from 'react';
//import loadData from "./index"

class SalesRecordForm extends React.Component {
            state = {
            price: '',
            customer: '',
            sales_person: '',
            automobile: '',
            customers: [],
            sales_persons: [],
            automobiles: []
        };


    handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...this.state};
        //data.sales_persons = data.salesPersons;
        delete data.automobiles;
        delete data.sales_persons;
        delete data.customers;
        console.log(data);

        const salesRecordUrl = 'http://localhost:8090/api/sales_records/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(salesRecordUrl, fetchConfig);
        if (response.ok) {
          const newSalesRecord = await response.json();
          console.log(newSalesRecord);
          const cleared = {
            price: '',
            automobile: '',
            customer: '',
            sales_person: '',
          };
          this.setState(cleared);
          //loadData()
        }
        else{
          console.log("Message: Unable to complete")
        }
      }
    handlePriceChange = (event) => {
        const value = event.target.value;
        this.setState({price: value})
    }
    handleAutomobileChange = (event) => {
        const value = event.target.value;
        this.setState({automobile: value})
    }
    handleCustomerChange = (event) => {
        const value = event.target.value;
        this.setState({customer: value})
    }
    handleSalesPersonChange = (event) =>{
        const value = event.target.value;
        this.setState({sales_person: value})
    }

   componentDidMount = async (event) => {
        const url1 = 'http://localhost:8100/api/automobiles/';
        const url2 = 'http://localhost:8090/api/customers/';
        const url3 = 'http://localhost:8090/api/sales_persons/';

        const response1 = await fetch(url1);
        const response2 = await fetch(url2);
        const response3 = await fetch(url3);
        if (response1.ok) {
          const data = await response1.json();
            this.setState({automobiles: data.autos})
            console.log(data)
         }
        if (response2.ok) {
        const data = await response2.json();
            this.setState({customers: data.customers})
        }
        if (response3.ok) {
        const data = await response3.json();
            this.setState({sales_persons: data.sales_persons})
        }
        }

    render() {
        return (

        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new sales record</h1>
            <form onSubmit={this.handleSubmit} id="create-hat-form">
              <div className="form-floating mb-3">
                <input onChange={this.handlePriceChange} placeholder="price" required type="number" name="price" id="price" className="form-control" value={this.state.price}/>
                <label htmlFor="price">Price</label>
                </div>
                <select onChange={this.handleAutomobileChange} required id="automobile" name= "automobile" className="form-select" value={this.state.automobile}>
                  <option value="">Choose an automobile</option>
                  {this.state.automobiles.map(automobile => {
                    return (
                    <option key={automobile.id} value={automobile.vin}>
                        {automobile.vin}
                    </option>
                    );
                  })}
                </select>
                <select onChange={this.handleSalesPersonChange} required id="sales_person" name= "sales_person" className="form-select" value={this.state.sales_person}>
                  <option value="">Choose a sales person</option>
                  {this.state.sales_persons.map(salesPerson => {
                    return (
                    <option key={salesPerson.id} value={salesPerson.name}>
                        {salesPerson.name}
                    </option>
                    );
                  })}
                </select>
                <select onChange={this.handleCustomerChange} required id="customer" name= "customer" className="form-select" value={this.state.customer}>
                  <option value="">Choose a customer</option>
                  {this.state.customers.map(customer => {
                    return (
                    <option key={customer.id} value={customer.name}>
                        {customer.name}
                    </option>
                    );
                  })}
                </select>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>

        );
    }
}

export default SalesRecordForm
