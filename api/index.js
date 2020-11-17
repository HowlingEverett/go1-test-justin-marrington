const express = require('express');

const { list, show } = require('./events');
const { geocode } = require('./geocode');

const app = express();

app.get('/api/events', list);
app.get('/api/events/:eventId', show);
app.get('/api/geocode', geocode);

module.exports = app;
