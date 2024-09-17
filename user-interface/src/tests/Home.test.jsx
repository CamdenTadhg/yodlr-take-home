import {render} from '@testing-library/react';
import {it, expect} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import Home from '../Home';

it('renders without crashing', () => {
    render(
        <MemoryRouter>
            <Home/>
        </MemoryRouter>
    );
});

it('matches the snapshot', () => {
    const {asFragment} = render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})

it('displays the correct content', () => {
    const {getByText} = render(
        <MemoryRouter>
            <Home/>
        </MemoryRouter>
    );
    expect(getByText(/Welcome to Yodlr/i)).toBeInTheDocument();
})