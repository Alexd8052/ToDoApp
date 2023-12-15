import * as Yup from 'yup'

const catSchema = Yup.object().shape({
    catName: Yup.string().max(25, 'Max 25 characters').required('Required'),
    catDesc: Yup.string().max(50, 'Max 50 characters')
})

const toDoSchema = Yup.object().shape({
    name: Yup.string().max(25, 'Max 25 characters').required('Name is required!'),
    categoryId: Yup.number().required('Please select a category.')
})

export {catSchema, toDoSchema}