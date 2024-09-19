import React from 'react';
import {it, expect} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import EditUserForm from '../EditUserForm';

const testUser = { "id": 1, "email": "kyle@getyodlr.com", "firstName": "Kyle", "lastName": "White", "state": "active"}

it('renders without crashing', () => {
    render(
        <MemoryRouter>
            <EditUserForm user={testUser}/>
        </MemoryRouter>
    );
});

it('matches snapshot', () => {
    const {asFragment} = render(
        <MemoryRouter>
            <EditUserForm user={testUser}/>
        </MemoryRouter>
    );
});

it('displays the correct content', () => {
    const {getByDisplayValue} = render(
        <MemoryRouter>
            <EditUserForm user={testUser}/>
        </MemoryRouter>
    );
    expect(getByDisplayValue(/Kyle/)).toBeInTheDocument();
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

    const {getByText, getByLabelText} = render(
        <MemoryRouter>
            <EditUserForm user={testUser}/>
        </MemoryRouter>
    );

    await userEvent.clear(getByLabelText(/Email/i));
    await userEvent.type(
        getByLabelText(/Email/i), 
        'kylewhite@getyodlr.com');
    await userEvent.click(getByText(/Submit/i));
    
    expect(mock.history.put.length).toBe(1);
    expect(mock.history.put[0].data).toBe(JSON.stringify({
        id: 1,
        email: 'kylewhite@getyodlr.com',
        firstName: 'Kyle', 
        lastName: 'White', 
        state: 'active'
    }));
    expect(getByText(/User Kyle White Updated/i)).toBeInTheDocument();
});

