import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <form method="POST" action="/upload-css" enctype="multipart/form-data">
    <div>
        <label>Select your profile picture:</label>
        <input type="file" name="evil_css" />
    </div>
    <div>
        <input type="submit" name="btn_evil_css" value="Upload" />
    </div>
</form>
      </header>
    </div>
  );
}

export default App;
