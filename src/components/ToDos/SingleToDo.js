import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import ToDoEdit from './ToDoEdit';

export default function SingleToDo(props) {
  const { name, done, toDoId, category } = props.toDo;
  const { currentUser } = useAuth();
  const [showEdit, setShowEdit] = useState(false);

  const deleteToDo = (id) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      axios.delete(`https://localhost:7108/api/ToDos/${id}`).then(() => {
        props.getToDos();
      });
    }
  };

  const handleCheckboxChange = () => {
    const updatedToDo = { ...props.toDo, done: !done };

    axios.put(`https://localhost:7108/api/ToDos/${toDoId}`, updatedToDo).then(() => {
      props.getToDos();
    });
  };

  return (
    <tr>
      <td>{name}</td>
      <td>
        <input type="checkbox" checked={done} onChange={handleCheckboxChange} />
      </td>
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL && (
        <td>
          <button onClick={() => setShowEdit(true)} className="m-1 rounded" id="editLink">
            <FaEdit />
          </button>
          <button onClick={() => deleteToDo(toDoId)} className="m-1 rounded" id="deleteLink">
            <FaTrashAlt />
          </button>
        </td>
      )}
      {showEdit && (
        <ToDoEdit
          setShowEdit={setShowEdit}
          showEdit={showEdit}
          getToDos={props.getToDos}
          toDo={props.toDo}
        />
      )}
    </tr>
  );
}
