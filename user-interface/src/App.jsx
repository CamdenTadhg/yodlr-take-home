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
          <div className='main'>
          <Routes>
            <Route path='/signup' element={<SignupForm/>}/>
            <Route path='/admin' element={<UserList/>}/>
            <Route path='/' element={<Home/>}/>
          </Routes>
          </div>
        </BrowserRouter>

    </div>
  )
}

export default App

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
  //change variable names to be clearer
