import React from 'react';
import {it, expect, vi} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import {render, waitFor} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import DeleteUser from '../DeleteUser';

const testUser = { "id": 1, "email": "kyle@getyodlr.com", "firstName": "Kyle", "lastName": "White", "state": "active"}

let deleteUser = async (user) => {
    console.log('user.id is', user.id);
    await axios.delete(`http://localhost:3000/users/${user.id}`);
    setMessage(`User ${user.firstName} ${user.lastName} deleted.`);
}

it('renders without crashing', () => {
    render(
        <MemoryRouter>
            <DeleteUser user={testUser} deleteUser={deleteUser}/>
        </MemoryRouter>
    );
});

it('matches snapshot', () => {
    const {asFragment} = render(
        <MemoryRouter>
            <DeleteUser user={testUser} deleteUser={deleteUser}/>
        </MemoryRouter>
    );
});

it('displays the correct content', () => {
    const {getByText} = render(
        <MemoryRouter>
            <DeleteUser user={testUser} deleteUser={deleteUser}/>
        </MemoryRouter>
    );
    expect(getByText(/Delete/i)).toBeInTheDocument();
});

it('runs the delete function on click', async () => {
    deleteUser = vi.fn()
    const {getByText} = render(
        <MemoryRouter>
            <DeleteUser user={testUser} deleteUser={deleteUser}/>
        </MemoryRouter>
    );
    userEvent.click(getByText(/Delete/i));
    await waitFor(() => {
        expect(deleteUser).toHaveBeenCalledWith(testUser);
    })
});

