import axios from 'axios';

const apiRoot = () => {
  return process.env.API_ROOT || `/api`;
};

export const fetchEvents = async () => {
  const eventsUrl = `${apiRoot()}/events`;
  const { data } = await axios.get(eventsUrl);
  return data.events;
};
