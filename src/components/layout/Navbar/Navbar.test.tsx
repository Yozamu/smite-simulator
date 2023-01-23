import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { mockNavbarProps } from './Navbar.mocks';

test('Some test', () => {
  render(<Navbar {...mockNavbarProps.base} />);
  expect(screen.getByText('Hello world!')).toBeInTheDocument();
});
