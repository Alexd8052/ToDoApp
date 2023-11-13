import React, {useState} from 'react'
import {useAuth} from '../../contexts/AuthContext'
import {FaEdit, FaTrashAlt} from 'react-icons/fa'
import ToDoEdit from './ToDoEdit'
import axios from 'axios'

export default function SingleToDo(props) {
    const {name, description, toDoId} = props.todo
    const [showEdit, setShowEdit] = useState(false)
    const {currentUser} = useAuth()

    const deleteToDo = (id) => {
        if(window.confirm(`Are you sure you want to delete ${name}?`)){
            axios.delete(`https://localhost:7108/api/ToDos/${id}`).then(() => {
                props.getToDos()
            })
        }
    }

  return (
    <div className='singleToDo col-md-5 m-4'>
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
            <div>
                <button onClick={() => setShowEdit(true)} id='editLink'>
                    <FaEdit />
                </button>
                <button onClick={() => deleteToDo(toDoId)} id='deleteLink'>
                    <FaTrashAlt />
                </button>
                {showEdit &&
                    <ToDoEdit 
                        todo={props.todo}
                        showEdit={showEdit}
                        setShowEdit={setShowEdit}
                        getToDos={props.getToDos} />
                }
            </div>
        }
        <h3>{name}</h3>
        {description !== null ?
            <p>{description}</p> : <p>No description provided.</p>
        }
    </div>
  )
}
