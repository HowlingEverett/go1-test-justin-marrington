import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Routes = () => (
  <Switch>
    <Route exact path="/event/:id">
      <EventDetail />
    </Route>

    <Route exact path="/">
      <EventsList />
    </Route>

    <Route>
      <FourOhFour />
    </Route>
  </Switch>
);

const EventsList = () => <div>{'Events list'}</div>;
const EventDetail = () => <div>{'Event detail'}</div>;
const FourOhFour = () => <div>{"Sorry, this page doesn't exist"}</div>;

export default Routes;
