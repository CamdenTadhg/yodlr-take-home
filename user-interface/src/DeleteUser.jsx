import React from 'react';

const DeleteUser = ({user, deleteUser}) => {
    return (
        <button onClick={() => deleteUser(user)}>Delete</button>
    )
}

export default DeleteUser;