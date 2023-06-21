import { render, screen } from '@testing-library/react';
import SkloMontazhApp from "./App";

test('renders learn react link', () => {
  render(<SkloMontazhApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
