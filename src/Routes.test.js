import { useReducer } from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';
import {
  eventsReducer,
  initialState,
  EventsContext,
} from './store/events-store';

const ComponentUnderTest = () => {
  const [state, dispatch] = useReducer(eventsReducer, initialState);

  return (
    <EventsContext.Provider value={{ state, dispatch }}>
      <Routes />
    </EventsContext.Provider>
  );
};

const renderWithRouter = (component, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(component, { wrapper: BrowserRouter });
};

test('Matches / route', () => {
  renderWithRouter(<ComponentUnderTest />, { route: '/' });

  expect(screen.getByText('Events List')).toBeInTheDocument();
});

test('Matches an event detail route', () => {
  renderWithRouter(<ComponentUnderTest />, { route: '/event/1' });

  expect(screen.getByText('Back to events')).toBeInTheDocument();
});

test('Requires an event id in the detail route', () => {
  renderWithRouter(<ComponentUnderTest />, { route: '/event' });

  expect(screen.getByText(/this page doesn't exist/i)).toBeInTheDocument();
});
