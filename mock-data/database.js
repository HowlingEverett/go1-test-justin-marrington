const { MongoClient } = require('mongodb');

const databaseUrl =
  process.env.DATABASE_URL ||
  'mongodb://root:example@go1-test-justin-marrington_mongo_1.pelias_default:27017?retryWrites=true&w=majority';
const client = new MongoClient(databaseUrl);

module.exports.bootstrapEvents = async (events) => {
  try {
    const db = await connect();

    const insertableEvents = events.map(shapeForInsert);
    const result = await db.collection('events').insertMany(insertableEvents);

    await db.collection('events').createIndex({ location: '2dsphere' });

    return result;
  } catch (error) {
    console.error('Failed to bootstrap events');
    console.error(error);
  }
};

module.exports.filterEvents = async (query) => {
  try {
    const db = await connect();
    const cursor = db.collection('events').find(query, {
      projection: {
        _id: 1,
        location: 1,
        address: 1,
        title: 1,
        time: 1,
        image: 1,
      },
    });
    return await cursor.toArray();
  } catch (error) {
    console.error('Failed to load events');
    console.error(error);
  }
};

module.exports.getEvent = async (id) => {
  const db = await connect();
  return await db.collection.events.findOne({ _id: id });
};

let database;
const connect = async () => {
  if (database) return database;

  try {
    await client.connect();
    database = client.db('eventsDb');
    return database;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const shapeForInsert = (event) => {
  return {
    location: {
      type: 'Point',
      coordinates: [
        event.Location.Coordinates.Longitude,
        event.Location.Coordinates.Latitude,
      ],
    },
    address: {
      city: event.Location.City,
      region: event.Location.State,
      country: event.Location.Country,
    },
    title: event.Title,
    time: new Date(event.Time),
    image: event.Image,
  };
};
