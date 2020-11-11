import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import './App.css';
import Routes from './Routes';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
