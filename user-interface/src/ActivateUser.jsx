import React from 'react';
import './ActivateUser.css';

const ActivateUser = ({user, activate}) => {
    return (
        <button onClick={() => activate(user)} data-testid={`activate${user.id}`}>Activate</button>
    ) 
}

export default ActivateUser;