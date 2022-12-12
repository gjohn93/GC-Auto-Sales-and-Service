import { NavLink } from 'react-router-dom';
import "./Nav.css"

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Service</a>
            <ul className='dropdown-menu'>
            <li className="nav-item">
              <NavLink className="nav-links"  to="/service/new">New Service Appointment</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-links" to="/service">Service List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-links" to="/technicians/new">New Technicians</NavLink>
            </li>
            </ul>
            </li>
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Inventory</a>
            <ul className='dropdown-menu'>
            <li className="nav-item">
              <NavLink className="nav-links" to="/manufacturers/">Manufacturers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-links" to="/manufacturers/new">New Manufacturer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-links" to="/models/">Models</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-links" to="/models/new">New Model</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-links" to="/automobiles/">Automobile Inventory</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-links" to="/automobiles/new">New Automobile</NavLink>
            </li>
            </ul>
            </li>
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Sales</a>
            <ul className='dropdown-menu'>
            <li className="nav-item">
              <NavLink className="nav-links" to="/customers/new">New Customer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-links" to="/customers/">Customers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-links" to="/sales_persons/new">New Salesperson</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-links" to="/sales_records/new">New Sales Record</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-links" to="/sales_records/">Sales Records</NavLink>
            </li>
            </ul>
            </li>
     </ul>
     </div>
     </div>
    </nav>
  )
}

export default Nav;
