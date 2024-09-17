import {render, getByText} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import App from '../App';
import userEvent from '@testing-library/user-event';
import {it, expect} from 'vitest';

it('renders home page and navigates to signup page and back', async () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    );

    expect(getByText(/Welcome to Yodlr/i)).toBeInTheDocument();

    await userEvent.click(getByText(/Signup/i));

    expect(getByText(/Signup Form/i)).toBeInTheDocument;

    await userEvent.click(getByText(/Yodlr/i));

    expect(getByText(/Welcome to Yodlr/i)).toBeInTheDocument();
});


it('navigates to user list page and user edit page', async () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    );

    await userEvent.click(getByText(/Admin/i));
    expect(getByText(/User List/i)).toBeInTheDocument;
    
    await userEvent.click(getByText(/Kyle White/i));
    expect(getByText(/Edit User/i)).toBeInTheDocument;
});

it('renders without crashing', () => {
    render(
    <MemoryRouter>
        <App/>
    </MemoryRouter>
    );
});

it('matches snapshot', () => {
    const {asFragment} = render(
    <MemoryRouter>
        <App/>
    </MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
})
