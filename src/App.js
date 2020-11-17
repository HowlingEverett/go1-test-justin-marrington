import React, { useMemo, useReducer } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import './App.css';
import Routes from './Routes';
import {
  eventsReducer,
  initialState,
  EventsContext,
} from './store/events-store';

function App() {
  const [state, dispatch] = useReducer(eventsReducer, initialState);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <Router>
      <EventsContext.Provider value={contextValue}>
        <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>

          <Routes />
        </div>
      </EventsContext.Provider>
    </Router>
  );
}

export default App;
