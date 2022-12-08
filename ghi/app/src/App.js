import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ServiceAppointmentForm from './ServiceAppointmentForm';
import ServiceList from './ServiceList';
import CustomerForm from './CustomerForm';
import ManufacturerForm from './ManufacturerForm';
import ModelForm from './ModelForm';

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
