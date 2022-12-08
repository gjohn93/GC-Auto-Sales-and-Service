function InventoryList() {
    const [manufacturers, setManufacturers] = useState([])
    const [models, setModels] = useState([])
    const [automobiles, setAutomobiles] = useState([])

    const getData = async () => {
      const resp = await fetch('http://localhost:8100/api/manufacturers/')
      const data = await resp.json()
      setManufacturers(data.manufacturers)
      console.log(data.manufacturers)

      setManufacturers(manufacturers)
    }
