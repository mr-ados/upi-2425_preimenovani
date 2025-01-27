/* import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../../firebaseConfig';
import AdminDashboard from '../AdminDashboard';
import Login from '../Login';
import { ref, update } from 'firebase/database';

// Mock the Firebase Authentication functions
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock('firebase/database', () => ({
  ref: jest.fn(),
  set: jest.fn(),
  update: jest.fn(),
  onValue: jest.fn(),
}));

jest.mock('../../firebaseConfig', () => ({
  auth: {
    currentUser: { uid: 'test-uid' },
  },
  database: {
    ref: jest.fn(),
    set: jest.fn(),
    update: jest.fn(),
    onValue: jest.fn(),
  },
}));

// Mock window.alert
window.alert = jest.fn();

test('admin can add menu item and data is sent to the database', async () => {
  signInWithEmailAndPassword.mockResolvedValue({
    user: { uid: '6wzWtXrjqjTghE6E704N5cOmpLF2' },
  });

  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </MemoryRouter>
    );
  });

  // Fill in the email and password fields
  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: 'admin@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: 'adminpassword' },
  });

  // Click the login button
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  });

  // Check if the signInWithEmailAndPassword function was called
  expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'admin@example.com', 'adminpassword');

  // Check if the alert was called
  expect(window.alert).toHaveBeenCalledWith('Prijava uspješna');

  // Check if the user is redirected to the admin dashboard
  const adminDashboardHeadings = await screen.findAllByRole('heading', { name: /admin dashboard/i });
  expect(adminDashboardHeadings[0]).toBeInTheDocument();

  // Select menza1
  fireEvent.change(screen.getByText(/odaberite menzu/i).closest('select'), {
    target: { value: 'm1' },
  });

  // Simulate adding a menu item
  await act(async () => {
    fireEvent.change(screen.getByText(/odaberite desert/i).closest('select'), {
      target: { value: 'Cake' },
    });
    fireEvent.change(screen.getByText(/odaberite glavno jelo/i).closest('select'), {
      target: { value: 'Steak' },
    });
    fireEvent.change(screen.getByText(/odaberite piće/i).closest('select'), {
      target: { value: 'Water' },
    });
    fireEvent.change(screen.getByText(/odaberite predjelo/i).closest('select'), {
      target: { value: 'Soup' },
    });

    // Click the add menu item button
    fireEvent.click(screen.getByRole('button', { name: /dodaj stavku/i }));
  });

  // Check if the data was sent to the database
  expect(update).toHaveBeenCalledWith(ref(database, 'menza/m1'), {
    desert: 'Cake',
    glavnoJelo: 'Steak',
    pice: 'Water',
    predjelo: 'Soup',
  });

  console.log('Test completed successfully');
});