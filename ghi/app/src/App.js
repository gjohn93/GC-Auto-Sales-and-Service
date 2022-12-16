import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ServiceAppointmentForm from "./ServiceAppointmentForm";
import ActiveServiceList from "./ActiveServiceList";
import CustomerForm from "./CustomerForm";
import ManufacturerForm from "./ManufacturerForm";
import ModelForm from "./ModelForm";
import AutomobileForm from "./AutomobileForm";
import SalesPersonForm from "./SalesPersonForm";
import SalesRecordForm from "./SalesRecordForm";
import CustomerList from "./CustomerList";
import SalesRecordList from "./SalesRecordList";
import AutomobileList from "./AutomobileList";
import ModelList from "./ModelList";
import ManufacturerList from "./ManufacturerList";
import TechnicianForm from "./TechnicianForm";
import ServiceHistoryList from "./ServiceHistory";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="service/new" element={<ServiceAppointmentForm />} />
          <Route path="service/history" element={<ServiceHistoryList />} />
          <Route path="service" element={<ActiveServiceList />} />
          <Route path="customers/new" element={<CustomerForm />} />
          <Route path="manufacturers/new" element={<ManufacturerForm />} />
          <Route path="models/new" element={<ModelForm />} />
          <Route path="automobiles/new" element={<AutomobileForm />} />
          <Route path="sales_persons/new" element={<SalesPersonForm />} />
          <Route path="sales_records/new" element={<SalesRecordForm />} />
          <Route path="customers" element={<CustomerList />} />
          <Route path="sales_records" element={<SalesRecordList />} />
          <Route path="automobiles" element={<AutomobileList />} />
          <Route path="manufacturers" element={<ManufacturerList />} />
          <Route path="models" element={<ModelList />} />
          <Route path="technicians/new" element={<TechnicianForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
