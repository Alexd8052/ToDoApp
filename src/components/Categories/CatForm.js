import React from 'react'
//Below are the 3 components from Formik we need to build our form
//we already installed using 'npm install formik'
import { Formik, Form, Field } from 'formik'
import { catSchema } from '../../utilities/validationSchema'
import axios from 'axios'

export default function CatForm(props) {

  const handleSubmit = (values) => {
    console.log(values)
    if(!props.category) {
      //If there is no prop for "category", we are in create mode inside this scope.
      //first, we assemble a temp object to send in our request
      const catToCreate = values

      //second, we send the object in a POST request using axios
      axios.post(`https://localhost:7108/api/Categories`, catToCreate).then(() => {
        props.setShowCreate(false)//this will close the create form
        props.getCategories()//this will refresh the table of categories to include the new one
      })
    } else {
      //If there is a prop for "category", we are in edit mode inside this scope
      //first, we assemble our temp object, adding in the categoryId
      const catToEdit = {
        categoryId: props.category.categoryId,
        catName: values.catName,
        catDesc: values.catDesc
      }
      axios.put(`https://localhost:7108/api/Categories/${props.category.categoryId}`, catToEdit).then(() => {
        props.setShowEdit(false)
        props.getCategories()
      })
    }
  }

  return (
    <div className='createCategory m-2 text-white text-center'>
      <Formik
        validationSchema={catSchema}
        initialValues={
          //Below is a ternary operator that makes our form behave differently based on whether we have a prop called category. (ie Editing a category)
          {
            catName: props.category ? props.category.catName : '',
            catDesc: props.category ? props.category.catDesc : ''
          }}
          onSubmit={values => handleSubmit(values)}>
        {({errors, touched}) => (
          //Our form will go here
          <Form id='catForm' className='row text-center m-auto'>
            <div className="form-group m-1 p-1">
              <Field name='catName' className='form-control' placeholder='Name' />
              {/* Below is the conditionally rendered error message */}
              {errors.catName && touched.catName &&
                <div className="text-danger">{errors.catName}</div>
              }
            </div>
            <div className="form-group m-1 p-1">
              <Field name='catDesc' className='form-control' placeholder='Description' />
              {/* Below is the conditionally rendered error message */}
              {errors.catDesc && touched.catDesc &&
                <div className="text-danger">{errors.catDesc}</div>
              }
            </div>
            <div className="form-group m-1">
              <button type='submit' className="btn btn-success">
                Submit Category to API
              </button>
            </div>
          </Form>
        )}
        
      </Formik>
    </div>
  )
}