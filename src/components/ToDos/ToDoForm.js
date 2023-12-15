import React, {useState, useEffect} from 'react'
import {Formik, Field, Form} from 'formik'
import {toDoSchema} from '../../utilities/validationSchema'
import axios from 'axios'

export default function ToDoForm(props) {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get(`https://localhost:7108/api/Categories`).then(response => {
            console.log(response)
            setCategories(response.data)
        })
    }, [])

    const handleSubmit = (values) => {
        console.log(values);
      
        if (!props.todo) {
          // If there is no todo, create a new one
          const toDoToCreate = values;
          axios.post(`https://localhost:7108/api/ToDos`, toDoToCreate).then(() => {
            props.setShowCreate(false);
            props.getToDos();
          });
        } else {
          // If there is a todo, edit an existing one
          const toDoToEdit = {
            toDoId: props.todo.toDoId,
            name: values.name,
            categoryId: values.categoryId
          };
      
          axios.put(`https://localhost:7108/api/ToDos/${props.todo.toDoId}`, toDoToEdit).then(() => {
            props.setShowEdit(false);
            props.getToDos();
          });
        }
      };
  return (
    <Formik
        validationSchema={toDoSchema}
        initialValues={{
        name: props.todo ? props.todo.name : '',
        categoryId: props.todo ? props.todo.categoryId : ''
        }}
        onSubmit={(values) => handleSubmit(values, props.todo)}>
        {({errors, touched}) => (
            <Form id='toDoForm'>
                <div className="form-group m-3">
                    <Field name='name' placeholder='Name' className='form-control' />
                    {errors.name && touched.name && <div>{errors.name}</div>}
                </div>
                <div className='form-group m-3'>
                    <Field as='select' name='categoryId' className='form-control'>
                    <option value='' disabled>
                        [--Please Choose--]
                    </option>
                    {categories.map(cat => 
                        <option key={cat.categoryId} value={cat.categoryId}>
                            {cat.catName}
                        </option>
                    )}
                    </Field>
                </div>
                <div className="form-group m-3">
                    <button type='submit' className="btn btn-success m-3">
                        Submit ToDo to API
                    </button>
                </div>
            </Form>
        )}
    </Formik>
  )
}
