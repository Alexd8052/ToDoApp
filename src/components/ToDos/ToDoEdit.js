import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ToDoForm from './ToDoForm';

export default function ToDoEdit(props) {
  const todoName = props.todo?.name || ''; 

  return (
    <Modal
      show={props.showEdit}
      onHide={() => props.setShowEdit(false)}
      size='lg'
    >
      <Modal.Header className='bg-info' closeButton>
        <h3>Editing {todoName}</h3>
      </Modal.Header>
      <Modal.Body>
        <ToDoForm
          setShowEdit={props.setShowEdit}
          getToDos={props.getToDos}
          todo={props.todo}
        />
      </Modal.Body>
    </Modal>
  );
}