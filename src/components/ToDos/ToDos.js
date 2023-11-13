import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import SingleToDo from './SingleToDo'
import FilterCat from './FilterCat'
import {useAuth} from '../../contexts/AuthContext'
import ToDoCreate from './ToDoCreate'

export default function Todos() {
  const [toDos, setToDos] = useState([])
  const {currentUser} = useAuth()
  const [showCreate, setShowCreate] = useState(false)
  const [filter, setFilter] = useState(0)

  const getToDos = () => {
    axios.get(`https://localhost:7108/api/ToDos`).then(response => {
      setToDos(response.data)
    })
  }

  useEffect(() => {
    getToDos()
  }, [])

  return (
    <section className="resources">
      <article className="bg-info p-5">
        <h1 className='text-center'>ToDo Dashboard</h1>
      </article>
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div className="bg-dark p-2 mb-3 text-center">
          <button onClick={() => setShowCreate(!showCreate)} className="btn btn-info">
            {!showCreate ? 'Create New ToDo' : 'Cancel'}
          </button>
          <div className="createContainer">
            {showCreate &&
              <ToDoCreate 
                getToDos={getToDos}
                setShowCreate={setShowCreate} />
            }
          </div>
        </div>
      }
      <FilterCat setFilter={setFilter} />
      <Container>
        <article className="toDoGallery row justify-content-center">
          {filter === 0 ? toDos.map(td =>
            <SingleToDo key={td.ToDoId} toDo={td} getToDos={getToDos} />
          ) :
          toDos.filter(td => td.categoryId === filter).map(td =>
            <SingleToDo key={td.toDoId} toDo={td} getToDos={getToDos} />
            )}
            {filter !== 0 && toDos.filter(td => td.categoryId === filter).length === 0 &&
              <h2 className="alert alert-warning text-dark">
                There are no results for this category.
              </h2>
            }
        </article>
      </Container>
    </section>
  )
}
