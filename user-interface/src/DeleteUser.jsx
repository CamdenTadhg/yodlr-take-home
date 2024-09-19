import React from 'react';
import './ActivateUser.css';

const DeleteUser = ({user, deleteUser}) => {
    return (
        <button onClick={() => deleteUser(user)} data-testid={`delete${user.id}`}>Delete</button>
    )
}

export default DeleteUser;