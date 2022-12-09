import React from 'react';
//import loadData from "./index"

class ManufacturerForm extends React.Component {
      state = {
            name: '',
        };


    handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...this.state};

        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(manufacturerUrl, fetchConfig);
        if (response.ok) {
          const newManufacturer = await response.json();
          console.log(newManufacturer);
          const cleared = {
            name: '',
          };
          this.setState(cleared);
          //loadData()
        }
        else{
          console.log("an error has occured")
        }
      }
    handleNameChange = (event) => {
        const value = event.target.value;
        this.setState({name: value})
    }


    render() {
        return (

        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new manufacturer</h1>
            <form onSubmit={this.handleSubmit} id="create-hat-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="id" className="form-control" value={this.state.name}/>
                <label htmlFor="name">Name</label>
                </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>

        );
    }
}

export default ManufacturerForm
