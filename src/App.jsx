import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "./components/Button";
import "./PetangoGame.css";
import GameBoard from "./components/GameBoard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clockwise: true,
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img
            src={logo}
            className={
              "App-logo" +
              (this.state.clockwise ? " Animation" : " Animation-counterwise")
            }
            alt="logo"
          />
          <h2>Welcome to Reactor</h2>
          <Button
            deRotate={() => this.setState({ clockwise: !this.state.clockwise })}
          ></Button>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="PetangoGame">
          <h2>Petango Game</h2>
          <GameBoard boardSize={3} />
        </div>
      </div>
    );
  }
}

export default App;
