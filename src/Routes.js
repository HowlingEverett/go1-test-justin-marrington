import React from 'react';
import { Switch, Route } from 'react-router-dom';

import EventsList from './routes/events-list';
import EventDetail from './routes/event-detail';

const Routes = () => (
  <Switch>
    <Route exact path="/event/:eventId">
      <EventDetail />
    </Route>

    <Route exact path="/">
      <EventsList debounce={200} />
    </Route>

    <Route>
      <FourOhFour />
    </Route>
  </Switch>
);

const FourOhFour = () => <div>{"Sorry, this page doesn't exist"}</div>;

export default Routes;
