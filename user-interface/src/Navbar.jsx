import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <div id='Navbar'>
            <Link id='Navbar-logo' to='/'>Yodlr</Link>
            <Link className='Navbar-navlink' to='/signup'>Signup</Link>
            <Link className='Navbar-navlink' to='/admin'>Admin</Link> 
        </div>
    );
};

export default Navbar;