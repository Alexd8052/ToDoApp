import React, { useState } from 'react'
//Before importing below, we install react-icons
// "npm install react-icons"
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import CatEdit from './CatEdit'
import axios from 'axios'

export default function SingleCategory(props) {
  //Below we are destructuring specific properties off of our props.category object
  const {catName, catDesc, categoryId} = props.category

  //currentUser brought in to conditionally render Edit/Delete for admin only
  const { currentUser } = useAuth()

  //The hook below controls whether the edit form is shown/hidden
  const [showEdit, setShowEdit] = useState(false)

  //Below is our custom delete function
  const deleteCat = (id) => {
    if(window.confirm(`Are you sure you want to delete ${catName}?`)){
      //FUTURE POSSIBLE UPGRADE:
      //Check if any resources are in this categoryId and warn the user to delete
      //those resources or reassign their category before deleting the category
      axios.delete(`https://localhost:7108/api/Categories/${id}`).then(() => {
        props.getCategories()
      })
    }
  }

  return (
    <tr>
      <td>{catName}</td>
      <td>{catDesc}</td>
      {/* BEGIN EDIT UI - show only to admin user */}
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <td>
          <button onClick={() => setShowEdit(true)} className="m-1 rounded" id="editLink">
            <FaEdit />
          </button>
          <button onClick={() => deleteCat(categoryId)} className="m-1 rounded" id="deleteLink">
            <FaTrashAlt />
          </button>
          {/* Below we conditionally render CatEdit when showEdit is true */}
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