import {render} from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import {it, expect} from 'vitest';

it('renders home page and navigates to signup page and back', async () => {
    const {getByText, getAllByText} = render(
        <App />
    );

    expect(getByText(/Welcome to Yodlr/i)).toBeInTheDocument();

    await userEvent.click(getByText(/Signup/i));

    expect(getByText(/Signup for Yodlr/i)).toBeInTheDocument;

    await userEvent.click(getByText(/Yodlr Home/i));

    expect(getByText(/Welcome to Yodlr/i)).toBeInTheDocument();
});


it('navigates to user list page', async () => {
    const {getByText} = render(
        <App />
    );

    await userEvent.click(getByText(/Admin/i));
    expect(getByText(/User List/i)).toBeInTheDocument;
    
});

it('renders without crashing', () => {
    render(
        <App/>
    );
});

it('matches snapshot', () => {
    const {asFragment} = render(
        <App/>)
    expect(asFragment()).toMatchSnapshot();
})
