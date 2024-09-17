import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DeleteUser from './DeleteUser';
import ActivateUser from './ActivateUser';
import EditUserForm from './EditUserForm';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getUsers = async () => {
            let currentUsers = await axios.get('http://localhost:3000/users');
            console.log('currentUsers is', currentUsers.data);
            setUsers(currentUsers.data);
        }
        getUsers();
    }, [])

    const deleteUser = async (user) => {
        console.log('user.id is', user.id);
        await axios.delete(`http://localhost:3000/users/${user.id}`);
        setMessage(`User ${user.firstName} ${user.lastName} deleted.`);
    }

    const activate = async (user) => {
        await axios.put(`http://localhost:3000/users/${user.id}`, {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            state: 'active'
        });
        setMessage(`User ${user.firstName} ${user.lastName} activated.`);
    }

    return(
        <div>
            <EditUserForm deleteUser={deleteUser} activate={activate}/>
            <h1>User List</h1>
            {message ? <div>{message}</div> : null}
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user) => {
                    return (
                    <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        {user.state === 'active' ? <td></td> : <td><ActivateUser user={user} activate={activate}/></td>}
                        <td><DeleteUser user={user} deleteUser={deleteUser}/></td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default UserList;