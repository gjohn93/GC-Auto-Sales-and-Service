import React from 'react';
//import loadData from "./index"

class ModelForm extends React.Component {
      state = {
            name: '',
            pictureUrl: '',
            //manufacturer_id: '',
            manufacturers: []
        };


    handleSubmit = async (event) =>{
        event.preventDefault();
        const data = {...this.state};
        data.picture_url = data.pictureUrl;
        //data.manufacturer_id = data.manufacturerId;
        delete data.pictureUrl;
        //delete data.manufacturerId;
        delete data.manufacturers;
        console.log(data);

        const modelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(modelUrl, fetchConfig);
        if (response.ok) {
          const newModel = await response.json();
          console.log(newModel);
          const cleared = {
            name: '',
            pictureUrl: '',
            manufacturer_id: '',
          };
          this.setState(cleared);
          //loadData()
        }
      }
    handleNameChange = (event) => {
        const value = event.target.value;
        this.setState({name: value})
    }
    handlePictureUrlChange = (event) => {
        const value = event.target.value;
        this.setState({pictureUrl: value})
    }
    handleManufacturerChange = (event) => {
        const value = event.target.value;
        this.setState({manufacturer_id: value})
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/manufacturers/';

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
            this.setState({manufacturers: data.manufacturers})
         }
        }

    render() {
        return (

        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new model</h1>
            <form onSubmit={this.handleSubmit} id="create-hat-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="id" className="form-control" value={this.state.name}/>
                <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                <input onChange={this.handlePictureUrlChange} placeholder="picture_url" required type="url" name="picture_url" id="picture_url" className="form-control" value={this.state.pictureUrl}/>
                <label htmlFor="picture_url">Picture</label>
                </div>
                <select onChange={this.handleManufacturerChange} required id="manufacturer_id" name= "manufacturer_id" className="form-select" value={this.state.manufacturer_id}>
                  <option value="">Choose a manufacturer</option>
                  {this.state.manufacturers.map(manufacturer_id => {
                    return (
                    <option key={manufacturer_id.id} value={manufacturer_id.id}>
                        {manufacturer_id.name}
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

export default ModelForm
