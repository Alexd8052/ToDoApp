import React from 'react'
import CatForm from './CatForm'


export default function CatCreate(props) {
  return (
    <div>
      <CatForm getCategories={props.getCategories} setShowCreate={props.setShowCreate} />
    </div>
  )
}
