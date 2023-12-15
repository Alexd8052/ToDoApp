import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import ProfilePic from '../assets/IMG_6214.jpg'

export default function Welcome() {
    const { currentUser } = useAuth()
    return (
        <Container className='welcomeCon'>
            <h1 className='justify-content-center mt-3 mb-3'>Welcome To My To-Do app</h1>
            <div className='row'>
                <div className='welcomeText col-md-7'>
                    <h3 className='text-center mt-1 HeaderText'>Meet The Developer</h3>
                    <p className='pText'>
                        Greetings! I'm Alex Davenport, delighted to have you explore my creation, the React To-Do app! Crafted using
                        <a href='https://reactjs.org/' target='_blank' rel='noreferrer' class='p-link'>
                            ReactJS 
                        </a>
                        , this app seamlessly connects to a well-organized database through an efficient backend built on
                        <a
                            href='https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-6.0'
                            target='_blank'
                            rel='noreferrer'
                            class='p-link'
                        >
                            ASP.NET API
                        </a>
                        . To elevate its capabilities, it leverages a trove of npm packages: routing magic by&nbsp;
                        <a href='https://reactrouter.com/en/main' target='_blank' rel='noreferrer' class='p-link'>
                            React Router Dom
                        </a>
                        , smooth API interactions managed with&nbsp;
                        <a href='https://axios-http.com/' target='_blank' rel='noreferrer' class='p-link'>
                            Axios
                        </a>
                        , fortified by the security prowess of&nbsp;
                        <a href='https://firebase.google.com/products/auth' target='_blank' rel='noreferrer' class='p-link'>
                            Google Firebase
                        </a>
                        . Infused with HTML finesse and React Bootstrap artistry, it reflects my fusion of coding expertise. The full
                        masterpiece, adorned with HTML and React Bootstrap finesse, is&nbsp;
                        <a href='https://github.com/Alexd8052/todoapp' target='_blank' rel='noreferrer' class='p-link'>
                            available on GitHub
                        </a>
                        .
                    </p>
                </div>
                <div className='WelcomeImg col-md-3'>
                    <img src={ProfilePic} alt='Developer Portrait' photo />
                </div>
            </div>
        </Container>
    )
}