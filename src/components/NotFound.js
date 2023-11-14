import React from 'react'
import image from '../images/404.jpg'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className='notFound'>
        <img src={image} alt="ToDo not found" />
        <h1>ToDo Not Found</h1>
    </div>
  )
}
