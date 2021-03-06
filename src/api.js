import axios from 'axios';

const apiRoot = () => {
  return process.env.API_ROOT || `/api`;
};

export const fetchEvents = async ({ q, coordinates, between } = {}) => {
  const eventsUrl = `${apiRoot()}/events`;
  const { data } = await axios.get(eventsUrl, {
    params: { q, coordinates, between },
  });
  return data;
};

export const fetchEvent = async (eventId) => {
  const eventUrl = `${apiRoot()}/events/${eventId}`;
  const { data } = await axios.get(eventUrl);
  return data;
};

export const geocode = async (addressFragment) => {
  const geocodeUrl = `${apiRoot()}/geocode`;
  const { data } = await axios.get(geocodeUrl, {
    params: { address: addressFragment },
  });
  return data;
};
