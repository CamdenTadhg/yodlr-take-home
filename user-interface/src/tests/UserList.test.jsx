import React from 'react';
import { it, expect, beforeEach } from 'vitest';
import { render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import UserList from '../UserList';

beforeEach(() => {
    const mock = new MockAdapter(axios);
    mock.onGet('http://localhost:3000/users/').reply(200, ([
        {
            id: 1,
            email: 'kyle@getyodlr.com',
            firstName: 'Kyle',
            lastName: 'White',
            state: 'active'
        },
        {
            id: 2,
            email: 'jane@getyodlr.com',
            firstName: 'Jane', 
            lastName: 'Stone',
            state: 'active'
        },
        {
            id: 3,
            email: 'lilly@getyodlr.com',
            firstName: 'Lilly', 
            lastName: 'Smith',
            state: 'pending'
        }
    ]))
})

it('renders without crashing', () => {
    render(
        <MemoryRouter>
            <UserList/>
        </MemoryRouter>
    );
});

it('matches the snapshot', () => {
    const {asFragment} = render(
        <MemoryRouter>
            <UserList/>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

it('renders the correct content', () => {
    const {getByText} = render(
        <MemoryRouter>
            <UserList/>
        </MemoryRouter>
    );
    expect(getByText(/User List/i)).toBeInTheDocument();
});

it('deletes a user', async () => {
    const mock = new MockAdapter(axios);
    mock.onDelete('http://localhost:3000/users/1').reply(204,         {
        id: 1,
        email: 'kyle@getyodlr.com',
        firstName: 'Kyle',
        lastName: 'White',
        state: 'active'
    });

    const {getByTestId, getByText} = render(
        <MemoryRouter>
            <UserList/>
        </MemoryRouter>
    );

    await userEvent.click(getByTestId(/delete1/i));
    console.log('mock history is', mock.history.delete);
    expect(mock.history.delete.length).toBe(1);
    expect(mock.history.delete.url).toBe('http://localhost:3000/users/1');
    expect(getByText(/User Kyle White deleted/i)).toBeInTheDocument();
});

it('activates a user', async () => {
    const mock = new MockAdapter(axios);
    mock.onPut('http://localhost:3000/users/3').reply(200, {
        id: 3,
        email: 'lilly@getyodlr.com',
        firstName: 'Lilly', 
        lastName: 'Smith',
        state: 'active'
    });

    const {getByTestId, getByText} = render(
        <MemoryRouter>
            <UserList/>
        </MemoryRouter>
    );

    await userEvent.click(getByTestId(/activate3/i));
    expect(mock.history.put.length).toBe(1);
    expect(mock.history.put[0].data).toBe(JSON.stringify({
        id: 3,
        email: 'lilly@getyodlr.com',
        firstName: 'Lilly',
        lastName: 'Smith', 
        state: 'active'
    }));
    expect(getByText(/User Lilly Smith activated/i)).toBeInTheDocument();
});