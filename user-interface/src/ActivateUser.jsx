import React from 'react';

const ActivateUser = ({user, activate}) => {
    return (
        <button onClick={() => activate(user)}>Activate</button>
    ) 
}

export default ActivateUser;