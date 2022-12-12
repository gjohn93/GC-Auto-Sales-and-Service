import React, {useState, useEffect} from 'react'


const initialData = {
  price:'',
  customer:'',
  sales_person:'',
  automobile:'',
}


export default function SalesRecordForm(){
  const [formData, setFormData] = useState(initialData);
  const [customers,setCustomers] = useState([]);
  const [sales_persons,setSalesPersons] = useState([]);
  const [automobiles,setAutomobiles] = useState([]);
  const [errorMessage,setSetErrorMessage] = useState('');
  const handleChange = (e) => {
      setFormData(
        {
          ...formData,
          [e.target.name]:e.target.value
        }
      )
  }


  const handleFormSubmit = async e => {
      e.preventDefault()
      const salesRecordFormUrl = `http://localhost:8090/api/sales_records/`;
      const fetchConfig = {
          method: 'post',
          body: JSON.stringify({
                ...formData
                }),
          headers: {'Content-Type': 'application/json'}
      }

        const response = await fetch(salesRecordFormUrl, fetchConfig)

        if (response.ok){
            const newSalesRecordForm = await response.json()
            console.log(newSalesRecordForm)
            setFormData(initialData)
            window.location = "/sales_records"
    }
        else{
            console.log("An error has occurred")
            setSetErrorMessage("This VIN is already sold")
        }
}

  const getCustomers = async () => {
      const url = await fetch('http://localhost:8090/api/customers/')
      const data = await url.json()
      setCustomers(data.customers)
  }
  const getSalesPersons = async () => {
    const url = await fetch('http://localhost:8090/api/sales_persons/')
    const data = await url.json()
    setSalesPersons(data.sales_persons)
  }
  const getAutomobiles = async () => {
    const url = await fetch('http://localhost:8100/api/automobiles/')
    const data = await url.json()
    setAutomobiles(data.autos)
}


  useEffect(() => {getCustomers()}, [])
  useEffect(() => {getSalesPersons()}, [])
  useEffect(() => {getAutomobiles()}, [])


    return(
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a sales record</h1>
            <form onSubmit = {handleFormSubmit} id="create-shoe-form">
              <div className="form-floating mb-3">
                <input onChange ={handleChange} value = {formData.price}  placeholder="price" required type="text" name="price" id="price" className="form-control"/>
                <label htmlFor="price">Price</label>
              </div>
              <div className="mb-3">
                <select onChange ={handleChange} value = {formData.customer} required id="customer" name= "customer" className="form-select">
                  <option value="">Customer</option>
                    {customers.map(customer => {
                      return (
                        <option key={customer.id} value={customer.name}>
                          {customer.name}
                        </option>
                      )
                    })};
                </select>
                </div>
                <div className="mb-3">
                <select onChange ={handleChange} value = {formData.sales_person} required id="sales_person" name= "sales_person" className="form-select">
                  <option value="">Sales Person</option>
                    {sales_persons.map(sales_person => {
                      return (
                        <option key={sales_person.id} value={sales_person.name}>
                          {sales_person.name}
                        </option>
                      )
                    })};
                </select>
                </div>
                <div className='error'>
                  { errorMessage }
                </div>
                <div className="mb-3">
                <select onChange ={handleChange} value = {formData.automobile} required id="automobile" name= "automobile" className="form-select">
                  <option value="">Automobile</option>
                    {automobiles.map(automobile => {
                      return (
                        <option key={automobile.id} value={automobile.vin}>
                          {automobile.vin}
                        </option>
                      )
                    })};
                </select>
                </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )

  }
