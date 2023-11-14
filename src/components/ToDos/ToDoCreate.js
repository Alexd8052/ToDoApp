import React from 'react'
import ToDoForm from './ToDoForm'

export default function ToDoCreate(props) {
  return (
    <article className="createTodo m-2 text-white justify-content-center">
        <ToDoForm 
            setShowCreate={props.setShowCreate}
            getToDos={props.getToDos} />
    </article>
  )
}
