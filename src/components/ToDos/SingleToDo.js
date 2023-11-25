import React, {useState} from 'react'
import {useAuth} from '../../contexts/AuthContext'
import {FaEdit, FaTrashAlt} from 'react-icons/fa'
import ToDoEdit from './ToDoEdit'
import axios from 'axios'

export default function SingleToDo(props) {
    const {name, done, toDoId, categoryId} = props.toDo
    const {currentUser} = useAuth()
    const [showEdit, setShowEdit] = useState(false)

    const deleteToDo = (id) => {
        if(window.confirm(`Are you sure you want to delete ${name}?`)){
            axios.delete(`https://localhost:7108/api/ToDos/${id}`).then(() => {
                props.getToDos()
            })
        }
    }

  return (
    <tr>
        <td>{name}</td>
        <td>{categoryId}</td>
        <td>{done}</td>
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
            <td>
                <button onClick={() => setShowEdit(true)} className="m-1 rounded" id="editLink">
                <FaEdit />
                </button>
                <button onClick={() => deleteToDo(toDoId)} className="m-1 rounded" id="deleteLink">
                <FaTrashAlt />
                </button>
                {showEdit &&
                <ToDoEdit setShowEdit={setShowEdit}
                showEdit={showEdit}
                getToDos={props.getToDos}
                toDo={props.toDo} />
                }
            </td>
        }
    </tr>
  )
}
