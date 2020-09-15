import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function useInput({ type, placeholder }) {
  const [value, setValue] = useState("");
  const input = (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      type={type}
    />
  );
  return [value, input];
}

function App() {
  const [username, userInput] = useInput({ type: "text", placeholder: "username" });
  const [password, passwordInput] = useInput({ type: "password", placeholder: "password" });

  return (
    <div className="App">
      <body className="App-header">
        <div class="titan-background"></div>
        <div class="marvellous-container">
          <div class="header">
            <h1>
              <span class="title-marvel">release your</span>
              <span class="title-studios">inner ninja</span>
            </h1>
            <h2> **under maintenance** </h2>
            <img src={logo} className="App-logo" alt="logo" />
            {userInput} <br />
            {passwordInput} <br />
            <h2> {username} </h2>
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
