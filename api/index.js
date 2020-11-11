const express = require('express');

const { list } = require('./events');

const app = express();

app.get('/api/events', list);

module.exports = app;
