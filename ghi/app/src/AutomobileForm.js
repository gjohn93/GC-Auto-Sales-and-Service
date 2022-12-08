import React from 'react';
//import loadData from "./index"

class AutomobileForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: '',
            year: '',
            vin: '',
            models: []
        };
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleVinChange = this.handlevinChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.models;
        console.log(data);

        const automobileUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(automobileUrl, fetchConfig);
        if (response.ok) {
          const newAutomobile = await response.json();
          console.log(newAutomobile);
          const cleared = {
            color: '',
            year: '',
            vin: '',
            model_id: '',
            model: '',
          };
          this.setState(cleared);
          //loadData()
        }
      }
    handleColorChange(event) {
        const value = event.target.value;
        this.setState({color: value})
    }
    handleYearChange(event) {
        const value = event.target.value;
        this.setState({year: value})
    }
    handleVinChange(event) {
        const value = event.target.value;
        this.setState({vin: value})
    }
    handleModelChange(event) {
        const value = event.target.value;
        this.setState({model: value})
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/models/';

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
            this.setState({models: data.models})
         }
        }

    render() {
        return (

        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new automobile</h1>
            <form onSubmit={this.handleSubmit} id="create-hat-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleColorChange} placeholder="color" required type="text" name="color" id="color" className="form-control" value={this.state.color}/>
                <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                <input onChange={this.handleYearChange} placeholder="year" required type="year" name="year" id="year" className="form-control" value={this.state.year}/>
                <label htmlFor="picture_url">Picture</label>
                </div>
                <div className="form-floating mb-3">
                <input onChange={this.handleVinChange} placeholder="vin" required type="vin" name="vin" id="vin" className="form-control" value={this.state.vin}/>
                <label htmlFor="picture_url">Picture</label>
                </div>
                <select onChange={this.handleModelChange} required id="model_id" name= "model_id" className="form-select" value={this.state.model_id}>
                  <option value="">Choose a manufacturer</option>
                  {this.state.models.map(modelId => {
                    return (
                    <option key={modelId.id} value={modelId.id}>
                        {modelId.name}
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

export default AutomobileForm
