import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import Login from '../Login';
import AdminDashboard from '../AdminDashboard';
import StudentDashboard from '../StudentDashboard';

// Mock the Firebase Authentication functions
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock('firebase/database', () => ({
  ref: jest.fn(),
  onValue: jest.fn(),
}));

jest.mock('../../firebaseConfig', () => ({
  auth: {
    currentUser: { uid: 'test-uid' },
  },
}));

// Mock window.alert
window.alert = jest.fn();

test('allows user to log in and redirects to student dashboard', async () => {
  signInWithEmailAndPassword.mockResolvedValue({
    user: { uid: 'test-uid' },
  });

  const mockOnValue = jest.fn((ref, callback) => {
    callback({
      val: () => ({
        desert: 'Ice Cream',
        glavnoJelo: 'Pizza',
        pice: 'Coke',
        predjelo: 'Salad',
      }),
    });
  });

  require('firebase/database').onValue.mockImplementation(mockOnValue);

  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Routes>
      </MemoryRouter>
    );
  });

  // Fill in the email and password fields
  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: 'password' },
  });

  // Click the login button
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  });

  // Check if the signInWithEmailAndPassword function was called
  expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password');

  // Check if the alert was called
  expect(window.alert).toHaveBeenCalledWith('Prijava uspješna');

  // Check if the user is redirected to the student dashboard
  const studentDashboardHeading = await screen.findByRole('heading', { name: /student dashboard/i });
  expect(studentDashboardHeading).toBeInTheDocument();
});

test('allows admin to log in and redirects to admin dashboard', async () => {
  signInWithEmailAndPassword.mockResolvedValue({
    user: { uid: '6wzWtXrjqjTghE6E704N5cOmpLF2' },
  });

  const mockOnValue = jest.fn((ref, callback) => {
    callback({
      val: () => ({
        desert: 'Ice Cream',
        glavnoJelo: 'Pizza',
        pice: 'Coke',
        predjelo: 'Salad',
      }),
    });
  });

  require('firebase/database').onValue.mockImplementation(mockOnValue);

  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
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
});