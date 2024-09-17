import React from 'react';
import {render, getByText} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {it, expect} from 'vitest';
import Navbar from '../Navbar'


it('renders without crashing', () => {
    render(
    <MemoryRouter>
        <Navbar/>
    </MemoryRouter>);
});

it('matches the snapshot', () => {
    const {asFragment} = render(
        <MemoryRouter>
            <Navbar/>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

it('displays the correct content', () => {
    render(
        <MemoryRouter>
            <Navbar/>
        </MemoryRouter>
    );

    expect(getByText(/Admin/i)).toBeInTheDocument();
    expect(getByText(/Yodlr/i)).toBeInTheDocument();
    expect(getByText(/Signup/i)).toBeInTheDocument();
})