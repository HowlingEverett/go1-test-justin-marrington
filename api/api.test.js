const request = require('supertest');

const app = require('./');

const EVENT_TITLES = [
  'Infection Prevention and Control (Australia)',
  'Wellbeing First - Mindfulness',
  '10 Minutes Managing Stress',
  '10 Minute Pandemic Awareness',
  'Morning Yoga Kickstart',
  'Hand Hygiene in the Workplace',
  'Equal Employment Opportunity',
  'First Aid - Basics',
].sort();

test('/api/events returns JSON', async () => {
  await request(app)
    .get('/api/events')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
});

test('/api/events returns full event list by default', async () => {
  const res = await request(app)
    .get('/api/events')
    .set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /json/);
  expect(res.body.events).toHaveLength(8);
  const titles = res.body.events.map((event) => event.Title).sort();
  expect(titles).toEqual(EVENT_TITLES);
});

test('/api/events takes a query filter on event title', async () => {
  let res = await request(app).get('/api/events').query({ q: '10 Minute' });
  let titles = res.body.events.map((event) => event.Title).sort();

  expect(res.body.events).toHaveLength(2);
  expect(titles).toEqual(
    ['10 Minutes Managing Stress', '10 Minute Pandemic Awareness'].sort()
  );

  res = await request(app).get('/api/events').query({ q: 'Yoga' });
  titles = res.body.events.map((event) => event.Title).sort();
  expect(res.body.events).toHaveLength(1);
  expect(titles).toEqual(['Morning Yoga Kickstart']);
});

test('/api/events takes a date range filter', async () => {
  let res = await request(app)
    .get('/api/events')
    .query({
      between: [new Date('2021-03-20'), new Date('2021-03-23')].join(','),
    });

  expect(res.body.events).toHaveLength(1);
  expect(res.body.events[0].Title).toBe(
    'Infection Prevention and Control (Australia)'
  );
});
