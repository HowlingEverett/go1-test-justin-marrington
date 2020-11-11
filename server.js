const express = require('express');

const app = require('./api');

// Static asset serving for create-react-app client build, in prod only
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

// Read port from ENV first, to protect 12-factor
app.set('port', process.env.API_PORT || 3080);

app.listen(app.get('port'), () => {
  console.log(`API server live on http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
