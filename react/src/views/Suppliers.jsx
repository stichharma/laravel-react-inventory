import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  useEffect(() => {
    getSuppliers();
  }, [])

  const onDeleteClick = supplier => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) {
      return
    }
    axiosClient.delete(`/suppliers/${supplier.id}`)
      .then(() => {
        setNotification('User was successfully deleted')
        getSuppliers()
      })
  }

  const getSuppliers = () => {
    setLoading(true)
    axiosClient.get('/suppliers')
      .then(({ data }) => {
        setLoading(false)
        setSuppliers(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Suppliers</h1>
        <Link className="btn-add" to="/suppliers/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Create Date</th>
            <th>Actions</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" class="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {suppliers.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.address}</td>
                <td>{u.phone}</td>
                <td>{u.created_at}</td>
                <td>
                  <Link className="btn-edit" to={'/suppliers/' + u.id}>Edit</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
