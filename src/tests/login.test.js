// login.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../components/Login';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React from "react";

// Mock Firebase methods
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

describe('Login Component', () => {
  it('should login with valid username and password', async () => {
    
    signInWithEmailAndPassword.mockResolvedValueOnce({ user: { email: 'korisnik@pmfst.hr' } });

    render(<Login />);  // Render your Login component

    // Find the username and password inputs and the submit button
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    // Simulate user typing in the username and password
    fireEvent.change(usernameInput, { target: { value: 'korisnik@pmfst.hr' } });
    fireEvent.change(passwordInput, { target: { value: 'korisnik123' } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Wait for the login process to complete and check if the mock function was called
    await waitFor(() => expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      'korisnik',
      'korisnik123'
    ));

    // Optionally, check for success message or redirection
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();  // Customize as needed
  });
});
