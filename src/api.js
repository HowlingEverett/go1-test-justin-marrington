import axios from 'axios';

const apiRoot = () => {
  const port = process.env.PORT || 3080;
  return process.env.API_ROOT || `http://localhost:${port}/api`;
};

export const fetchEvents = async () => {
  const eventsUrl = `${apiRoot()}/events`;
  const { data } = await axios.get(eventsUrl);
  return data;
};
