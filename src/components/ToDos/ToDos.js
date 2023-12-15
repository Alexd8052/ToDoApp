import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import SingleToDo from './SingleToDo'
import {useAuth} from '../../contexts/AuthContext'
import ToDoCreate from './ToDoCreate'

export default function Todos() {
  const [toDos, setToDos] = useState([]);
  const { currentUser } = useAuth();
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getToDos = async () => {
    try {
      const response = await axios.get(`https://localhost:7108/api/ToDos`);
      setToDos(response.data);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching ToDos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getToDos();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Check if currentUser is not null before accessing email property
  if (!currentUser || !currentUser.email) {
    return <p>Error: User information not available.</p>;
  }

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
              <ToDoCreate getToDos={getToDos} setShowCreate={setShowCreate} />
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
