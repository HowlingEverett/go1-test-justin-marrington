const mockEvents = require('../mock-data/events');

module.exports.list = async (req, res) => {
  const filteredEvents = await filterPipeline(mockEvents, req.query);

  res.json({ events: filteredEvents });
};

const filterPipeline = (events, params) => {
  return filterByTitle(events, params)
    .then(filterByLocation)
    .then(filterByTime);
};

const filterByTitle = (events, params) => {
  const { q: titleFilter } = params;

  const filteredEvents =
    titleFilter !== undefined
      ? mockEvents.filter((event) =>
          event.Title.toLowerCase().includes(titleFilter.toLowerCase())
        )
      : mockEvents;

  return Promise.resolve(filteredEvents, params);
};

// TODO: implement location filter
const filterByLocation = (events, params) => {
  return Promise.resolve(events, params);
};

// TODO: implement time filter
const filterByTime = (events, params) => {
  return Promise.resolve(events, params);
};
