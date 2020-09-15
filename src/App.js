import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <body className="App-header">
      <div class="titan-background">
        </div>
        <div class="marvellous-container">
          <div class="header">
            <h1>
              <span class="title-marvel">release your</span>
              <span class="title-studios">inner ninja</span>
            </h1>
            <img src={logo} className="App-logo" alt="logo" />
            <form action="">
              <div class="input-field">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="name"
                  autocomplete="off"
                  required=""
                ></input>
              </div>
            </form><form action="">
              <div class="input-field">
                <input
                  type="text"
                  name="password"
                  id="password"
                  placeholder="password"
                  autocomplete="off"
                  required=""
                ></input>
              </div>
            </form>
            <div class="wrap">
              <div class="ninja"></div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
