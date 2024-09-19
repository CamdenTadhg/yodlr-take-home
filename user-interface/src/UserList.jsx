import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DeleteUser from './DeleteUser';
import ActivateUser from './ActivateUser';
import EditUserForm from './EditUserForm';
import './UserList.css';
import { unary } from 'lodash';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [currUser, setCurrUser] = useState({
        email: '',
        firstName: '',
        lastName: ''
    })

    useEffect(() => {
        const getUsers = async () => {
            let currentUsers = await axios.get('http://localhost:3000/users/');
            setUsers(currentUsers.data);
        }
        getUsers();
    }, [])

    const deleteUser = async (delUser) => {
        await axios.delete(`http://localhost:3000/users/${delUser.id}`);
        setUsers(users.filter((u) => u.id !== delUser.id));
        setMessage(`User ${delUser.firstName} ${delUser.lastName} deleted.`);
    }

    const activate = async (user) => {
        const userData = {            
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            state: 'active'};
        await axios.put(`http://localhost:3000/users/${user.id}`, userData);
        const userIndex = users.findIndex((element) => element.id === user.id);
        users[userIndex] = userData;
        setMessage(`User ${user.firstName} ${user.lastName} activated.`);
    }

    return(
        <div id='UserList'>
            <EditUserForm user={currUser}/>
            <h1 id='UserList-header'>User List</h1>
            {message ? <div id='UserList-message'>{message}</div> : null}
            <table id='UserList-table'>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th></th>
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
                        <td><button onClick={() => {setCurrUser(user)}}>Edit</button></td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default UserList;