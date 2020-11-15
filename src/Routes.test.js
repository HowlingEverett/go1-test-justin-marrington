import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';

const renderWithRouter = (component, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(component, { wrapper: BrowserRouter });
};

test('Matches / route', () => {
  renderWithRouter(<Routes />, { route: '/' });

  expect(screen.getByText('Events List')).toBeInTheDocument();
});

test('Matches an event detail route', () => {
  renderWithRouter(<Routes />, { route: '/event/1' });

  expect(screen.getByText('Event detail')).toBeInTheDocument();
});

test('Requires an event id in the detail route', () => {
  renderWithRouter(<Routes />, { route: '/event' });

  expect(screen.getByText(/this page doesn't exist/i)).toBeInTheDocument();
});
