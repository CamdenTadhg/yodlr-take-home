import axios from 'axios';
import React, {useState, useEffect} from 'react';

const EditUserForm = ({user, deleteUser, activate}) => {
    const [formData, setFormData] = useState(user);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const editedUser = await axios.put(`http://localhost:3000/users/${user.id}`, {...formData});
            if (editedUser) {
                setMessage(`User ${user.firstName} ${user.lastName} Updated.`)
            }
        } catch(error) {
            console.log(error);
            setMessage(error.message);
        }
    }

    return(
        <form>
            <label htmlFor='email'>Email: </label>
            <input type='text' name='email' id='email' value={formData.email} onChange={handleChange}/>
            <label htmlFor='firstName'>First Name: </label>
            <input type='text' name='firstName' id='firstName' value={formData.firstName} onChange={handleChange}/>
            <label htmlFor='lastName'>Last Name: </label>
            <input type="text" name='lastName' id='lastName' value={formData.lastName} onChange={handleChange}/>
            {message ? <div className='alert'>{message}</div> : null}
            <button onClick={handleSubmit}>Submit</button>
        </form>
    )
}

export default EditUserForm;