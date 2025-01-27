import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from '../Header';
import Login from '../Login';
import StudentProfile from '../StudentProfile';
import StudentDashboard from '../StudentDashboard';
import AdminDashboard from '../AdminDashboard';

test('renders Header component', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Header />} />
      </Routes>
    </MemoryRouter>
  );
  const headerElement = screen.getByRole('banner');
  expect(headerElement).toBeInTheDocument();
});

test('renders Login component when path is /login', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </MemoryRouter>
  );
  const loginHeading = screen.getByRole('heading', { name: /login/i });
  expect(loginHeading).toBeInTheDocument();
});

/*test('renders StudentProfile component when path is /student-profile', () => {
  render(
    <MemoryRouter initialEntries={['/student-profile']}>
      <Routes>
        <Route path="/student-profile" element={<StudentProfile />} />
      </Routes>
    </MemoryRouter>
  );
  const profileElement = screen.getByRole('heading', { name: /student profil/i });
  expect(profileElement).toBeInTheDocument();
}); */

test('renders StudentDashboard component when path is /student-dashboard', () => {
  render(
    <MemoryRouter initialEntries={['/student-dashboard']}>
      <Routes>
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Routes>
    </MemoryRouter>
  );
  const dashboardHeading = screen.getByRole('heading', { name: /student dashboard/i });
  expect(dashboardHeading).toBeInTheDocument();
});

test('renders AdminDashboard component when path is /admin', () => {
  render(
    <MemoryRouter initialEntries={['/admin']}>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </MemoryRouter>
  );
  const adminHeading = screen.getAllByRole('heading', { name: /admin dashboard/i });
  expect(adminHeading.length).toBeGreaterThan(0);
});