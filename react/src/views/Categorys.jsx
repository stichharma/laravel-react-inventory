import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Categorys() {
  const [categorys, setCategorys] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  useEffect(() => {
    getCategorys();
  }, [])

  const onDeleteClick = category => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return
    }
    axiosClient.delete(`/categorys/${category.id}`)
      .then(() => {
        setNotification('Category was successfully deleted')
        getCategorys()
      })
  }

  const getCategorys = () => {
    setLoading(true)
    axiosClient.get('/categorys')
      .then(({ data }) => {
        setLoading(false)
        setCategorys(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Categorys</h1>
        <Link className="btn-add" to="/categorys/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
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
            {categorys.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.description}</td>
                <td>{u.created_at}</td>
                <td>
                  <Link className="btn-edit" to={'/categorys/' + u.id}>Edit</Link>
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
