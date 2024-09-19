import React, {useState} from 'react';
import axios from 'axios';
import './SignupForm.css';

const SignupForm = (signup) => {
    const initialState = {
        email: '',
        firstName: '', 
        lastName: ''
    }
    const [formData, SetFormData] = useState(initialState);
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        const {name, value} = event.target;
        SetFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = await axios.post('http://localhost:3000/users/', {...formData});
            if (user) {
                setMessage('Signup complete')
            }
        } catch(error) {
            setMessage(error.message);
        }
    }

    return (
        <>
        <p className='SignupForm-header'>Signup for Yodlr</p>
        <div className='SignupForm-div'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email:</label>
                <input type='text' name='email' id='email' placeholder='Email' value={formData.email} onChange={handleChange}/>
                <label htmlFor='firstName'>First Name:</label>
                <input type='text' name='firstName' id='firstName' placeholder='First Name' value={formData.firstName} onChange={handleChange}/>
                <label htmlFor='lastName'>Last Name:</label>
                <input type='text' name='lastName' id='lastName' placeholder='Last Name' value={formData.lastName} onChange={handleChange}/>
                {message ? <div className='alert'>{message}</div> : null}
                <button className='submit'>Submit</button>
            </form>
        </div>
        </>

    )
}

export default SignupForm;