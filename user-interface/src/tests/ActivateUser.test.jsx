import React from 'react'; 
import {it, expect} from 'vitest';
import {render, waitFor} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {userEvent} from '@testing-library/user-event';
import ActivateUser from '../ActivateUser';

const user = { "id": 1, "email": "kyle@getyodlr.com", "firstName": "Kyle", "lastName": "White", "state": "active"}

const activateUser = () => {

}
it('renders without crashing', () => {
    render(
        <MemoryRouter>
            <ActivateUser user={user} activate={activateUser}/>
        </MemoryRouter>
    );
});

it('matches the snapshot', () => {
    const {asFragment} = render(
        <MemoryRouter>
            <ActivateUser user={user} activate={activateUser}/>
        </MemoryRouter>
    );
    expect(asFragment).toMatchSnapshot();
});

it('displays the correct content', () => {
    const {getByText} = render(
        <MemoryRouter>
            <ActivateUser user={user} activate={activateUser}/>
        </MemoryRouter>
    );
    expect(getByText(/Activate/i)).toBeInTheDocument();
});

it('runs the activate function on click', async () => {
    const {getByText} = render(
        <MemoryRouter>
            <ActivateUser user={user} activate={activateUser}/>
        </MemoryRouter>
    );
    userEvent.click(getByText(/Activate/i));
    await waitFor(() => {
        expect(activateUser).toHaveBeenCalledWith(1);
    });
});