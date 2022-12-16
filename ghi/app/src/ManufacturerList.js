import { useState, useEffect } from "react";

export default function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState([]);

  const getDataMFG = async () => {
    const resp = await fetch("http://localhost:8100/api/manufacturers/");
    const data = await resp.json();
    setManufacturers(data.manufacturers);
  };

  const handleDeleteMFG = async (pk) => {
    const resp = await fetch(`http://localhost:8100/api/manufacturers/${pk}`, {
      method: "DELETE",
    });
    const data = await resp.json();
    getDataMFG();
  };

  useEffect(() => {
    getDataMFG();
  }, []);

  return (
    <div>
      <h3 className="text-center">Manufacturers</h3>
      <table className="table table-hover table-striped">
        <thead className="text-center thead-light">
          <tr className="header">
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-center">
          {manufacturers.map((manufacturer) => {
            return (
              <tr className="align-middle" key={manufacturer.id}>
                <td>{manufacturer.name}</td>
                <td>
                  <button
                    className="btn btn-primary m-2 float-right"
                    onClick={() => {
                      handleDeleteMFG(manufacturer.id);
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
