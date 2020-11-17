const mockEvents = require('../mock-data/events');

module.exports.list = async (req, res) => {
  const filteredEvents = await filterPipeline({
    events: mockEvents,
    params: req.query,
  });

  res.json({ events: filteredEvents });
};

const filterPipeline = ({ events, params = {} }) => {
  return filterByTitle({ events, params })
    .then(filterByLocation)
    .then(filterByTime);
};

const filterByTitle = ({ events, params }) => {
  const { q: titleFilter } = params;

  // TODO: replace in-memory filtering with database query
  const filteredEvents =
    titleFilter !== undefined
      ? events.filter((event) =>
          event.Title.toLowerCase().includes(titleFilter.toLowerCase())
        )
      : events;

  return Promise.resolve({ events: filteredEvents, params });
};

// TODO: implement geo-spatial location filter
const filterByLocation = ({ events, params }) => {
  return Promise.resolve({ events, params });
};

const filterByTime = ({ events, params }) => {
  const { between } = params;
  if (between) {
    const [start, end] = between
      .split(',')
      .map((dateString) => new Date(dateString.trim()));
    const filteredEvents = events.filter((event) => {
      const eventTime = new Date(event.Time);
      return eventTime >= start && eventTime <= end;
    });
    return Promise.resolve(filteredEvents);
  } else {
    return Promise.resolve(events);
  }
};
