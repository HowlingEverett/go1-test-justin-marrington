import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import MOCK_EVENTS from '../../../mock-data/events';
import EventsList from './';

const apiServer = setupServer(
  rest.get('/api/events', (req, res, ctx) => {
    return res(ctx.json({ events: MOCK_EVENTS }));
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
