import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Search } from './Search';

function App() {
  return (
    <div className="App">
      <Search/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
