import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function SupplierForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [supplier, setSupplier] = useState({
    id: null,
    name: '',
    address: '',
    phone: '',
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/suppliers/${id}`)
        .then(({data}) => {
          setLoading(false)
          setSupplier(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (supplier.id) {
      axiosClient.put(`/suppliers/${supplier.id}`, supplier)
        .then(() => {
          setNotification('Supplier was successfully updated')
          navigate('/suppliers')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/suppliers', supplier)
        .then(() => {
          setNotification('Supplier was successfully created')
          navigate('/suppliers')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {supplier.id && <h1>Update Supplier: {supplier.name}</h1>}
      {!supplier.id && <h1>New Supplier</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={supplier.name} onChange={ev => setSupplier({...supplier, name: ev.target.value})} placeholder="Name"/>
            <input value={supplier.address} onChange={ev => setSupplier({...supplier, address: ev.target.value})} placeholder="Address"/>
            <input value={supplier.phone} onChange={ev => setSupplier({...supplier, phone: ev.target.value})} placeholder="Phone"/>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )
}
