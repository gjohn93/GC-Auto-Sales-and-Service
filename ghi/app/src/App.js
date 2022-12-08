import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ServiceAppointmentForm from './ServiceAppointmentForm';
import ServiceList from './ServiceList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="service/new" element={<ServiceAppointmentForm/>}/>
          <Route path="service" element={<ServiceList/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
