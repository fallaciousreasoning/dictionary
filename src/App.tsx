import React from 'react';
import './App.css';

import {Search } from './Search';
import { WordTip } from './WordTip';

function App() {
  return (
    <div className="dictionary">
      <Search/>
      <WordTip word="foo"/>
    </div>
  );
}

export default App;
