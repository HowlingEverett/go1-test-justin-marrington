const mockEvents = require('../mock-data/events');

module.exports.list = (req, res) => {
  res.json({ events: mockEvents });
};
