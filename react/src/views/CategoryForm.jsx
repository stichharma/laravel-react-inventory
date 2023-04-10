import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function CategoryForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [category, setCategory] = useState({
    id: null,
    name: '',
    description: ''
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/categorys/${id}`)
        .then(({data}) => {
          setLoading(false)
          setCategory(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (category.id) {
      axiosClient.put(`/categorys/${category.id}`, category)
        .then(() => {
          setNotification('Category was successfully updated')
          navigate('/categorys')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/categorys', category)
        .then(() => {
          setNotification('Category was successfully created')
          navigate('/categorys')
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
      {category.id && <h1>Update Category: {category.name}</h1>}
      {!category.id && <h1>New Category</h1>}
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
            <input value={category.name} onChange={ev => setCategory({...category, name: ev.target.value})} placeholder="Name"/>
            <input value={category.description} onChange={ev => setCategory({...category, description: ev.target.value})} placeholder="Description"/>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )
}
