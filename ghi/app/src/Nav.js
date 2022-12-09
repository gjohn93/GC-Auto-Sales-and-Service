import { NavLink } from 'react-router-dom';
import './Nav.css'

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"> */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
          </li>

          <li class="nav-item dropdown">
          <NavLink className="nav-link dropdown-toggle" to="/service/new" id="navbarDropdownMenuLink" role="button"
          data-mdb-toggle="dropdown" aria-expanded="false">
          Service
        </NavLink>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li>
              <NavLink className="dropdown-item" to="/service/new">Service Appointment</NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/service">Service List</NavLink>
            </li>
            </ul>
          </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers/new">Customers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturers/new">New Manufacturers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/models/new">New Model</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/automobiles/new">New Automobile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales_persons/new">New Sales person</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales_records/new">New Sales Records</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/inventory_list">Inventory List</NavLink>
            </li>
          </ul>
        </div>
      {/* </div> */}
    </nav>
  )
}

export default Nav;
