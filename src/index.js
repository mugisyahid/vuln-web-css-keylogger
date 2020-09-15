import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import logo from "./logo.svg";
import "./App.css";
import "./index.css";

class App extends React.Component {
  constructor() {
    super();
    this.usernameField = React.createRef();
    this.passwordField = React.createRef();

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);

    this.state = { username: "", password: "" };
  }

  handleChangeUsername(evt) {
    this.setState({ username: this.usernameField.current.value });
  }

  handleChangePassword(evt) {
    this.setState({ password: this.passwordField.current.value });
  }

  render() {
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
              <div class="input-field">
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                  autoComplete="off"
                  required=""
                  defaultValue={this.state.username}
                  ref={this.usernameField}
                  onChange={this.handleChangeUsername}
                  />
              </div>
              <div class="input-field">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  autoComplete="off"
                  required=""
                  defaultValue={this.state.password}
                  ref={this.passwordField}
                  onChange={this.handleChangePassword}
                />
              </div>
              <h2>{this.state.username}</h2>
              <div class="wrap">
                <div class="ninja"></div>
              </div>
            </div>
          </div>
        </body>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
