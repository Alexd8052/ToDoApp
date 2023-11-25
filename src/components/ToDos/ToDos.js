import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import SingleToDo from './SingleToDo'
import {useAuth} from '../../contexts/AuthContext'
import ToDoCreate from './ToDoCreate'

export default function Todos() {
  const [toDos, setToDos] = useState([])
  const {currentUser} = useAuth()
  const [showCreate, setShowCreate] = useState(false)

  const getToDos = () => {
    axios.get(`https://localhost:7108/api/ToDos`).then(response => {
      console.log(response)
      setToDos(response.data)
    })
  }

  useEffect(() => {
    getToDos()
  }, [])

  return (
    <section className="toDos">
      <article className="bg-danger p-5">
        <h1 className='text-center'>ToDo Dashboard</h1>
      </article>
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div className="bg-dark p-2 mb-3 text-center">
          {showCreate ? 
            <>
              <button onClick={() => setShowCreate(false)} className="btn btn-warning">
                Cancel
              </button>
              <ToDoCreate getCategories={getToDos} setShowCreate={setShowCreate} />
            </> :
            <button onClick={() => setShowCreate(true)} className="btn btn-info">
              Create ToDo
            </button>
          }
        </div>
      }
      <Container className="p-2">
        <table className="table bg-info table-dark my-3">
          <thead className="table-secondary text-uppercase">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Done?</th>
              {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
                <th>Actions</th>
              }
            </tr>
          </thead>
          <tbody>
            {toDos.map(td =>
              <SingleToDo key={td.toDoId} toDo={td}
              getToDos={getToDos} />  
            )}
          </tbody>
        </table>
      </Container>
    </section>
  )
}
