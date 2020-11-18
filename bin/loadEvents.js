const { bootstrapEvents } = require('../mock-data/database');
const MOCK_EVENTS = require('../mock-data/events');

const loadEvents = async (events) => {
  const result = await bootstrapEvents(events);
  console.log(`${result.insertedCount} documents were inserted`);
  process.exit(0);
};

loadEvents(MOCK_EVENTS);
