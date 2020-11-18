import React, { useReducer } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import Routes from './Routes';
import {
  eventsReducer,
  initialState,
  EventsContext,
} from './store/events-store';

function App() {
  const [state, dispatch] = useReducer(eventsReducer, initialState);

  return (
    <Router>
      <EventsContext.Provider value={{ state, dispatch }}>
        <div className="App">
          <Routes />
        </div>
      </EventsContext.Provider>
    </Router>
  );
}

export default App;
