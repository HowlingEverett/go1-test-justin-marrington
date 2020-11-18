const { filterEvents, getEvent } = require('../mock-data/database');

module.exports.list = async (req, res) => {
  const filteredEvents = await filterPipeline({ params: req.query });

  res.json({ events: filteredEvents });
};

module.exports.show = async (req, res) => {
  const event = getEvent(req.params.eventId);

  res.json({ event });
};

const filterPipeline = ({ databaseQuery, params }) => {
  return filterByTitle({ databaseQuery, params })
    .then(filterByLocation)
    .then(filterByTime)
    .then(executeQuery);
};

const filterByTitle = ({ databaseQuery, params }) => {
  const { q: titleFilter } = params;
  const query = databaseQuery || { $and: [] };

  const filteredQuery = titleFilter
    ? {
        ...query,
        $and: [...query.$and, { title: new RegExp(titleFilter) }],
      }
    : databaseQuery;
  return Promise.resolve({ databaseQuery: filteredQuery, params });
};

const filterByLocation = ({ databaseQuery, params }) => {
  const { coordinates } = params;

  if (coordinates) {
    const query = databaseQuery || { $and: [] };
    const [longitude, latitude] = coordinates.split(',').map(parseFloat);
    const filteredQuery = {
      ...query,
      $and: [
        ...query.$and,
        {
          location: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [longitude, latitude],
              },
              $maxDistance: 20000,
            },
          },
        },
      ],
    };
    return Promise.resolve({ databaseQuery: filteredQuery, params });
  } else {
    return Promise.resolve({ databaseQuery, params });
  }
};

const filterByTime = ({ databaseQuery, params }) => {
  const { between } = params;

  if (between) {
    const query = databaseQuery || { $and: [] };
    const [start, end] = between
      .split(',')
      .map((dateString) => new Date(dateString.trim()));

    const filteredQuery = {
      ...query,
      $and: [
        ...query.$and,
        {
          time: {
            $gte: start,
            $lte: end,
          },
        },
      ],
    };
    return Promise.resolve({ databaseQuery: filteredQuery, params });
  } else {
    return Promise.resolve({ databaseQuery, params });
  }
};

const executeQuery = async ({ databaseQuery }) => {
  return await filterEvents(databaseQuery);
};
