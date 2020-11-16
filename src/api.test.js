import axios from 'axios';

import MOCK_EVENTS from '../mock-data/events';
import { fetchEvents, geocode } from './api';

jest.mock('axios');

test('/api/events should fetch all events by default', async () => {
  const resp = { data: { events: MOCK_EVENTS } };
  axios.get.mockResolvedValue(resp);

  const eventsResponse = await fetchEvents();

  expect(eventsResponse.events).toEqual(MOCK_EVENTS);
});

test('/api/events should pass allowed query parameters', async () => {
  const resp = { data: { events: MOCK_EVENTS } };
  axios.get.mockResolvedValue(resp);

  await fetchEvents();
});

const GEOCODE_EXAMPLES = [
  {
    coordinates: [153.041397, -27.45231],
    address: {
      addressOne: '10 Stratton St',
      addressTwo: 'Unit 1205',
      locality: 'Newstead',
      region: 'Queensland',
      postalCode: '4006',
      country: 'Australia',
    },
  },
];

test('/api/geocode should return the result set from the geocoder', async () => {
  const resp = { data: { candidates: GEOCODE_EXAMPLES } };
  axios.get.mockResolvedValue(resp);

  const geocodeResponse = await geocode('10 stratton st newstead');

  expect(geocodeResponse.candidates).toEqual(GEOCODE_EXAMPLES);
});

test('/api/geocode should pass the addressFragment as a param', async () => {
  const resp = { data: { candidates: GEOCODE_EXAMPLES } };
  axios.get.mockResolvedValue(resp);

  await geocode('10 stratton st newstead');

  expect(axios.get.mock.calls.length).toBe(1);
  const queryParams = axios.get.mock.calls[0][1].params;
  expect(queryParams).toEqual({ address: '10 stratton st newstead' });
});
