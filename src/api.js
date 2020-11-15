import axios from 'axios';

const apiRoot = () => {
  return process.env.API_ROOT || `/api`;
};

export const fetchEvents = async ({ q, coords, timestamp } = {}) => {
  const eventsUrl = `${apiRoot()}/events`;
  const { data } = await axios.get(eventsUrl, {
    params: { q, coords, timestamp },
  });
  return data.events;
};
