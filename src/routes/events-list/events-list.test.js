import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import MOCK_EVENTS from '../../../mock-data/events';
import MOCK_CANDIDATES from '../../../mock-data/geocode-candidates';
import EventsList from './';

const apiServer = setupServer(
  rest.get('/api/events', (req, res, ctx) => {
    const query = req.url.searchParams.get('q');
    const coordinates = req.url.searchParams.get('coordinates');

    // Mock a request with a title query
    let mockFiltered = !!query
      ? MOCK_EVENTS.filter((event) =>
          event.Title.toLowerCase().includes(query.toLowerCase())
        )
      : MOCK_EVENTS;

    // Mock a request with a selected address coordinates
    mockFiltered = !!coordinates
      ? mockFiltered.filter((event) => event.Location.City === 'Brisbane')
      : mockFiltered;

    return res(ctx.json({ events: mockFiltered }));
  }),

  rest.get('/api/geocode', (req, res, ctx) => {
    return res(ctx.json({ candidates: MOCK_CANDIDATES }));
  })
);

beforeAll(() => apiServer.listen());
afterEach(() => apiServer.resetHandlers());
afterAll(() => apiServer.close());

test('loads and displays default events', async () => {
  render(<EventsList />);

  await waitFor(() => screen.getByRole('list'));

  const eventItems = screen.getAllByRole('listitem');
  // Expect an entry for each event in the default list
  expect(eventItems).toHaveLength(8);

  // Expect each list item to include the event title
  MOCK_EVENTS.forEach((event, index) => {
    expect(eventItems[index]).toHaveTextContent(event.Title);
  });
});

test('filters events by case-insensitive title filter', async () => {
  render(<EventsList />);
  const searchInput = screen.getByLabelText('Title');

  fireEvent.change(searchInput, { target: { value: '10 minute' } });
  await waitFor(() => screen.getByText('Loading events'));
  await waitFor(() => screen.getByRole('list'));
  let eventItems = screen.getAllByRole('listitem');

  expect(eventItems).toHaveLength(2);
  expect(eventItems[0]).toHaveTextContent(/10 Minutes Managing Stress/);
  expect(eventItems[1]).toHaveTextContent(/10 Minute Pandemic Awareness/);

  fireEvent.change(searchInput, { target: { value: 'basics' } });
  await waitFor(() => screen.getByText('Loading events'));
  await waitFor(() => screen.getByRole('list'));
  eventItems = screen.getAllByRole('listitem');

  expect(eventItems).toHaveLength(1);
  expect(eventItems[0]).toHaveTextContent(/First Aid - Basics/);
});

test('filters events by selected address candidate', async () => {
  render(<EventsList />);
  const addressSearchInput = screen.getByLabelText(/Near address/);

  fireEvent.focus(addressSearchInput);
  fireEvent.change(addressSearchInput, { target: { value: '10 stratton st' } });
  await waitFor(() => screen.getByText(/Newstead/));
  const candidate = screen.getByText(/Newstead/);
  fireEvent.click(candidate);

  await waitFor(() => screen.getByText('Loading events'));
  await waitFor(() => screen.getByRole('list'));
  const eventItems = screen.getAllByRole('listitem');

  expect(eventItems).toHaveLength(1);
  expect(eventItems[0]).toHaveTextContent(
    'Infection Prevention and Control (Australia)'
  );
});
