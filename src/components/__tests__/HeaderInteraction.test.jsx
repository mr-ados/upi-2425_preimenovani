import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Header from '../Header';
import Login from '../Login';

test('navigates to Login page when Login link is clicked', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </MemoryRouter>
  );
  const loginLink = screen.getByRole('link', { name: /login/i });
  expect(loginLink).toBeInTheDocument();

  // Simulate user clicking the login link
  userEvent.click(loginLink);

  // Check if the Login component is rendered
  const loginHeading = await screen.findByRole('heading', { name: /login/i });
  expect(loginHeading).toBeInTheDocument();
});