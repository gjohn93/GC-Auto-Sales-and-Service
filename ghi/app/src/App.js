import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ServiceAppointmentForm from './ServiceAppointmentForm';
import ServiceList from './ServiceList';
import CustomerForm from './CustomerForm';
import ManufacturerForm from './ManufacturerForm';
import ModelForm from './ModelForm';
import AutomobileForm from './AutomobileForm';
import SalesPersonForm from './SalesPersonForm';
import SalesRecordForm from './SalesRecordForm';
import InventoryList from './InventoryList';
import CustomerList from './CustomerList';
import SalesRecordList from './SalesRecordList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="service/new" element={<ServiceAppointmentForm/>}/>
          <Route path="service" element={<ServiceList/>}/>
          <Route path="customers/new" element={<CustomerForm/>}/>
          <Route path="manufacturers/new" element={<ManufacturerForm/>}/>
          <Route path="models/new" element={<ModelForm/>}/>
          <Route path="automobiles/new" element={<AutomobileForm/>}/>
          <Route path="sales_persons/new" element={<SalesPersonForm/>}/>
          <Route path="sales_records/new" element={<SalesRecordForm/>}/>
          <Route path="inventory_list" element={<InventoryList/>}/>
          <Route path="customers" element={<CustomerList/>}/>
          <Route path="sales_records" element={<SalesRecordList/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
