const express = require('express');

const { list } = require('./events');
const { geocode } = require('./geocode');

const app = express();

app.get('/api/events', list);
app.get('/api/geocode', geocode);

module.exports = app;
