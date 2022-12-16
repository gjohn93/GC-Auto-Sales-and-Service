import { useState, useEffect } from "react";

export default function ModelList() {
  const [models, setModels] = useState([]);

  const getDataModel = async () => {
    const resp = await fetch("http://localhost:8100/api/models/");
    const data = await resp.json();
    setModels(data.models);
  };

  const handleDeleteModel = async (pk) => {
    const resp = await fetch(`http://localhost:8100/api/models/${pk}`, {
      method: "DELETE",
    });
    const data = await resp.json();
    getDataModel();
  };

  useEffect(() => {
    getDataModel();
  }, []);

  return (
    <div>
      <h3 className="text-center">Models</h3>
      <table className="table table-hover table-striped">
        <thead className="text-center thead-light">
          <tr className="header">
            <th>Name</th>
            <th>Picture</th>
            <th>Manufactuer</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-center">
          {models.map((model) => {
            return (
              <tr className="align-middle" key={model.id}>
                <td>{model.name}</td>
                <td>
                  {" "}
                  <img
                    src={model.picture_url}
                    style={{ width: 200, height: 200 }}
                  />
                </td>
                <td> {model.manufacturer.name}</td>
                <td>
                  <button
                    className="btn btn-primary m-2"
                    onClick={() => {
                      handleDeleteModel(model.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
