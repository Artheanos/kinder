import { render, screen } from '@testing-library/react';
import HelloWorldApp from './HelloWorldApp';

test('renders learn react link', () => {
  render(<HelloWorldApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
