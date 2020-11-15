import axios from 'axios';

import MOCK_EVENTS from '../mock-data/events';
import { fetchEvents } from './api';

jest.mock('axios');

test('should fetch all events by default', async () => {
  const resp = { data: { events: MOCK_EVENTS } };
  axios.get.mockResolvedValue(resp);

  const eventsResponse = await fetchEvents();

  expect(eventsResponse).toEqual(MOCK_EVENTS);
});
