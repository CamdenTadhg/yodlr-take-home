import React from 'react';
import {it, expect} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import EditUserForm from '../EditUserForm';

const user = { "id": 1, "email": "kyle@getyodlr.com", "firstName": "Kyle", "lastName": "White", "state": "active"}

it('renders without crashing', () => {
    render(
        <MemoryRouter>
            <EditUserForm user={user}/>
        </MemoryRouter>
    );
});

it('matches snapshot', () => {
    const {asFragment} = render(
        <MemoryRouter>
            <EditUserForm user={user}/>
        </MemoryRouter>
    );
});

it('displays the correct content', () => {
    const {getByText} = render(
        <MemoryRouter>
            <EditUserForm user={user}/>
        </MemoryRouter>
    );
    expect(getByText(/Kyle/i)).toBeInTheDocument();
});

it("edits a user's record", async () => {
    const mock = new MockAdapter(axios);
    mock.onPut('http://localhost:3000/users/1').reply(200,{
        id: 1,
        email: 'kylewhite@getyodlr.com',
        firstName: 'Kyle',
        lastName: 'White',
        state: 'active'
    });

    const {getByText, getByPlaceholderText} = render(
        <MemoryRouter>
            <EditUserForm user={user}/>
        </MemoryRouter>
    );

    await userEvent.type(getByPlaceholderText(/Email/i), 'kylewhite@getyodlr.com');
    await userEvent.click(getByText(/Save/i));
    
    expect(mock.history.put.length).toBe(1);
    expect(mock.history.put[0].data).toBe(JSON.stringify({
        email: 'kylewhite@getyodlr.com',
        firstName: 'Kyle', 
        lastName: 'White'
    }));
    expect(getByText(/User Kyle White Updated/i)).toBeInTheDocument();
});

