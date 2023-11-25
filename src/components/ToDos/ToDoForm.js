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
        console.log(values)
        if(!props.todo){
            const toDoToCreate = values
            axios.post(`https://localhost:7108/api/ToDos`, toDoToCreate).then(() => {
                props.setShowCreate(false)
                props.getToDos()
            })
        } else {
            const toDoToEdit = {
                toDoId: props.toDo.toDoId,
                name: values.name,
                categoryId: values.categoryId
            }
            axios.put(`https://localhost:7108/api/ToDos/${props.toDo.toDoId}`, toDoToEdit).then(() => {
                props.setShowEdit(false)
                props.getToDos()
            })
        }
    }
  return (
    <Formik
        validationSchema={toDoSchema}
        initialValues={{
            name: props.todo ? props.toDo.name : '',
            categoryId: props.todo ? props.toDo.categoryId : ''
        }}
        onSubmit={(values) => handleSubmit(values)}>
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
