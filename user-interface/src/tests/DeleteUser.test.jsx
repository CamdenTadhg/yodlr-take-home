import React from 'react';
import {it, expect} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import {render, waitFor} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import DeleteUser from '../DeleteUser';

const user = { "id": 1, "email": "kyle@getyodlr.com", "firstName": "Kyle", "lastName": "White", "state": "active"}

const deleteUser = () => {

}

it('renders without crashing', () => {
    render(
        <MemoryRouter>
            <DeleteUser user={user} delete={deleteUser}/>
        </MemoryRouter>
    );
});

it('matches snapshot', () => {
    const {asFragment} = render(
        <MemoryRouter>
            <DeleteUser user={user} delete={deleteUser}/>
        </MemoryRouter>
    );
});

it('displays the correct content', () => {
    const {getByText} = render(
        <MemoryRouter>
            <DeleteUser user={user} delete={deleteUser}/>
        </MemoryRouter>
    );
    expect(getByText(/Delete/i)).toBeInTheDocument();
});

it('runs the delete function on click', async () => {
    const {getByText} = render(
        <MemoryRouter>
            <DeleteUser user={user} delete={deleteUser}/>
        </MemoryRouter>
    );
    userEvent.click(getByText(/Delete/i));
    await waitFor(() => {
        expect(deleteUser).toHaveBeenCalledWith(1);
    })
});

