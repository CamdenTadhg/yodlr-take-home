import React from 'react'; 
import {it, expect, vi} from 'vitest';
import {render, waitFor} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {userEvent} from '@testing-library/user-event';
import ActivateUser from '../ActivateUser';

const testUser = { "id": 1, "email": "kyle@getyodlr.com", "firstName": "Kyle", "lastName": "White", "state": "active"}

let activateUser = async (user) => {
    await axios.put(`http://localhost:3000/users/${user.id}`, {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        state: 'active'
    });
    setMessage(`User ${user.firstName} ${user.lastName} activated.`);
}

it('renders without crashing', () => {
    render(
        <MemoryRouter>
            <ActivateUser user={testUser} activate={activateUser}/>
        </MemoryRouter>
    );
});

it('matches the snapshot', () => {
    const {asFragment} = render(
        <MemoryRouter>
            <ActivateUser user={testUser} activate={activateUser}/>
        </MemoryRouter>
    );
    expect(asFragment).toMatchSnapshot();
});

it('displays the correct content', () => {
    const {getByText} = render(
        <MemoryRouter>
            <ActivateUser user={testUser} activate={activateUser}/>
        </MemoryRouter>
    );
    expect(getByText(/Activate/i)).toBeInTheDocument();
});

it('runs the activate function on click', async () => {
    activateUser = vi.fn();
    const {getByText} = render(
        <MemoryRouter>
            <ActivateUser user={testUser} activate={activateUser}/>
        </MemoryRouter>
    );
    userEvent.click(getByText(/Activate/i));
    await waitFor(() => {
        expect(activateUser).toHaveBeenCalledWith(testUser);
    });
});