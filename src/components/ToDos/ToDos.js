import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import SingleToDo from './SingleToDo';
import { useAuth } from '../../contexts/AuthContext';
import ToDoCreate from './ToDoCreate';
import FilterCat from './FilterCat'; // Import the FilterCat component

export default function Todos() {
  const [toDos, setToDos] = useState([]);
  const { currentUser } = useAuth();
  const [showCreate, setShowCreate] = useState(false);
  const [filter, setFilter] = useState(0); 

  const getToDos = () => {
    axios.get(`https://localhost:7108/api/ToDos`).then(response => {
      console.log(response);
      setToDos(response.data);
    });
  };

  useEffect(() => {
    getToDos();
  }, [filter]); 

  const filteredToDos = filter === 0 ? toDos : toDos.filter(todo => todo.category?.categoryId === filter);

  return (
    <section className="toDos">
      <article className="bg-danger p-5">
        <h1 className="text-center text-">ToDo Dashboard</h1>
      </article>
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL && (
        <div className="bg-dark p-2 mb-3 text-center">
          {showCreate ? (
            <>
              <button onClick={() => setShowCreate(false)} className="btn btn-warning">
                Cancel
              </button>
              <ToDoCreate getToDos={getToDos} setShowCreate={setShowCreate} />
            </>
          ) : (
            <button onClick={() => setShowCreate(true)} className="btn btn-danger">
              Create
            </button>
          )}
        </div>
      )}
      <FilterCat setFilter={setFilter} /> 
      <Container className="p-2">
        <table className="table bg-info table-dark my-3">
          <thead className="table-secondary text-uppercase">
            <tr>
              <th>Name</th>
              <th>Done?</th>
              {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredToDos.map(td => (
              <SingleToDo key={td.toDoId} toDo={td} getToDos={getToDos} />
            ))}
          </tbody>
        </table>
      </Container>
    </section>
  );
}