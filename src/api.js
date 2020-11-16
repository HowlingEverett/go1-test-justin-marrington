import axios from 'axios';

const apiRoot = () => {
  return process.env.API_ROOT || `/api`;
};

export const fetchEvents = async ({ q, coordinates, timestamp } = {}) => {
  const eventsUrl = `${apiRoot()}/events`;
  const { data } = await axios.get(eventsUrl, {
    params: { q, coordinates, timestamp },
  });
  return data;
};

export const geocode = async (addressFragment) => {
  const geocodeUrl = `${apiRoot()}/geocode`;
  const { data } = await axios.get(geocodeUrl, {
    params: { address: addressFragment },
  });
  return data;
};
