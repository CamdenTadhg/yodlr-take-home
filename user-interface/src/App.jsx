import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './Navbar';
import SignupForm from './SignupForm';
import Home from './Home';
import UserList from './UserList';
import EditUserForm from './EditUserForm';
import './App.css'

function App() {

  return (
    <div className='App'>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/signup' element={<SignupForm/>}/>
            <Route path='/admin' element={<UserList/>}/>
            <Route path='/users/:id' element={<EditUserForm/>}/>
            <Route path='/' element={<Home/>}/>
          </Routes>
        </BrowserRouter>

    </div>
  )
}

export default App

//user administration functionality
  //edit user form
    //pass down necessary functions to add delete and activate functions here
  //run tests -- App, Activate User, DeleteUser, EditUserForm, Home, Navbar, SignupForm, UserList
//style pages (try using Foundation - https://github.com/digiaonline/react-foundation#readme)
  //home page
  //user registration form
  //user list
  //delete user button
  //activate user button
  //edit user form
//run tests - App, Activate User, DeleteUser, EditUserForm, Home, Navbar, SignupForm, UserList
//dynamic data on admin page
//admin creation of new accounts
//sign up form validation
//sorting/searching of users
//authentication/authorization
//optimize assets (minimize and/or bundle css/js)
//experiment with alternative designs (A/B Testing is important for registration!)
  //move all axios into a separate api file and use variable for URL
  //add redux
    //move delete and activate functions to store?
