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

//set up routes
  //create home
  //run tests
//user registration functionality
  //write user registration form tests
    //smoke
    //snapshot
    //content
    //functionality
  //user registration form
  //run tests
//user administration functionality
  //write user lists tests
    //smoke
    //snapshot
    //content
    //functionality
  //write delete user button tests
    //smoke
    //snapshot
    //content
    //functionality
  //write activate user button tests
    //smoke
    //snapshot
    //content
    //functionality
  //write edit user form tests
    //smoke
    //snapshot
    //content
    //functionality
  //user list
  //delete user button
  //activate user button
  //edit user form
  //run tests
//style pages
  //home page
  //user registration form
  //user list
  //delete user button
  //activate user button
  //edit user form
//run tests
//dynamic data on admin page
//admin creation of new accounts
//sign up form validation
//sorting/searching of users
//authentication/authorization
//experiment with alternative designs (A/B Testing is important for registration!)
//optimize assets (minimize and/or bundle css/js)
