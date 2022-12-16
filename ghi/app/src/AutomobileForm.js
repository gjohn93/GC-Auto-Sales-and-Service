import React, { useState, useEffect } from "react";

export default function AutomobileForm() {
  const initialData = {
    color: "",
    year: "",
    vin: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [models, setModels] = useState([]);
  const [inventoryVins, setInventoryVins] = useState([]);
  const [VINerrorMessage, setVINErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const getModels = async () => {
    const url = await fetch("http://localhost:8100/api/models/");
    if (url.ok) {
      const data = await url.json();
      setModels(data.models);
    } else {
      setErrorMessage("Models are unavailable");
    }
  };
  useEffect(() => {
    getModels();
  }, []);

  const getInventoryVINs = async () => {
    const url = await fetch("http://localhost:8100/api/automobiles/");
    if (url.ok) {
      const data = await url.json();
      let a = ((data.autos).map((automobile) => automobile.vin))
      setInventoryVins(a);
    }
  };
  useEffect(() => {getInventoryVINs()},[])

  const checkVin = (e) => {
    if (inventoryVins.includes(e.target.value)) {
      setVINErrorMessage("This VIN is already in inventory");
    }
    else{
      setVINErrorMessage("")
    }
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const automobileUrl = "http://localhost:8100/api/automobiles/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(automobileUrl, fetchConfig);

    if (response.ok) {
      setFormData(initialData);
    } else {
      setErrorMessage(
        "Cannot create automobile at this time. Please review form for correct data"
      );
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new automobile</h1>
          <form onSubmit={handleFormSubmit} id="create-hat-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                placeholder="color"
                required
                type="text"
                name="color"
                id="color"
                className="form-control"
                value={formData.color}
              />
              <label htmlFor="name">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                placeholder="year"
                required
                type="year"
                name="year"
                id="year"
                className="form-control"
                value={formData.year}
              />
              <label htmlFor="year">Year</label>
            </div>
            <div className="error">{VINerrorMessage}</div>
            <div className="form-floating mb-3">
              <input
                onChange={checkVin}
                onInput={handleChange}
                placeholder="vin"
                required
                type="vin"
                name="vin"
                id="vin"
                className="form-control"
                value={formData.vin}
              />
              <label htmlFor="vin">VIN</label>
              {/* <div>{checkVin()}</div> */}
            </div>
            <select
              onChange={handleChange}
              required
              id="model_id"
              name="model_id"
              className="form-select"
              value={formData.model_id}
            >
              <option value="">Choose a model</option>
              {models.map((model_id) => {
                return (
                  <option key={model_id.id} value={model_id.id}>
                    {model_id.name}
                  </option>
                );
              })}
            </select>
            <div className="error">{errorMessage}</div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
