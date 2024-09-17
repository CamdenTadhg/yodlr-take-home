import React from 'react';
import {render, waitFor} from '@testing-library/react';
import {it, expect} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import SignupForm from '../SignupForm';

it('renders without crashing', () => {
    render(
        <MemoryRouter>
            <SignupForm/>
        </MemoryRouter>
    );
});

it('matches the snapshot', () => {
    const {asFragment} = render(
        <MemoryRouter>
            <SignupForm/>
        </MemoryRouter>
    );
});

it('displays the correct content', () => {
    const {getByText} = render(
        <MemoryRouter>
            <SignupForm/>
        </MemoryRouter>
    )
    expect(getByText('Signup for Yodlr')).toBeInTheDocument();
})

it('updates form content on typing', async () => {
    const {getByPlaceholderText} = render(
        <MemoryRouter>
            <SignupForm/>
        </MemoryRouter>
    );

    await userEvent.type(getByPlaceholderText(/Email/i),'testuser@test.com');
    expect(getByPlaceholderText(/Email/i)).toHaveValue('testuser@test.com');
});

it('sends the data to create a new user', async() => {
    const mock = new MockAdapter(axios);
    mock.onPost('http://localhost:3000/users/1').reply(200,'user data');
    const {getByText, getByPlaceholderText} = render(
        <MemoryRouter>
            <SignupForm/>
        </MemoryRouter>
    )

    await userEvent.type(getByPlaceholderText(/Email/i), 'testuser@test.com');
    await userEvent.type(getByPlaceholderText(/First Name/i), 'Test');
    await userEvent.type(getByPlaceholderText(/Last Name/i), 'User');
    await userEvent.click(getByText(/Submit/i));

    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].data).toBe(JSON.stringify({
        email: 'testuser@test.com',
        firstName: 'Test', 
        lastName: 'User'
    }));
});