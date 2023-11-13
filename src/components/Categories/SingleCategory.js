import React, {useState} from 'react'
import {FaEdit, FaTrashAlt} from 'react-icons/fa'
import {useAuth} from '../../contexts/AuthContext'
import CatEdit from './CatEdit'
import axios from 'axios'

export default function SingleCategory(props) {

    const {categoryName, categoryDescription, categoryId} = props.category
    const {currentUser} = useAuth()
    const [showEdit, setShowEdit] = useState(false)

    const deleteCat = (id) => {
        if(window.confirm(`Are you sure you want to delete ${categoryName}?`)){
            axios.delete(`https://localhost:7108/api/Categories/${id}`).then(() => {
                props.getCategories()
            })
        }
    }

    return (
        <tr>
            <td>{categoryName}</td>
            <td>{categoryDescription}</td>
            {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
                <td>
                    <button onClick={() => setShowEdit(true)} className='m-1 rounded' id='editLink'>
                        <FaEdit />
                    </button>
                    <button onClick={() => deleteCat(categoryId)} className='m-1 rounded' id='deleteLink'>
                        <FaTrashAlt />
                    </button>
                    {showEdit &&
                        <CatEdit 
                            setShowEdit={setShowEdit}
                            showEdit={showEdit}
                            getCategories={props.getCategories}
                            category={props.category} />
                    }
                </td>
            }
        </tr>
    )
}
