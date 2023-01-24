import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

test('Some test', () => {
  render(<Navbar />);
  expect(screen.getByText('Hello world!')).toBeInTheDocument();
});
