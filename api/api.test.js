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
