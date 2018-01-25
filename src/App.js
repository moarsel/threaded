import React, { Component } from "react";
import { Provider } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import store from "./store";
import Comment from "./Comment";

class App extends Component {
  render() {
    const topComment = store.getState().comments["16141013"];
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <h1> Comments </h1>
          <section style={{ textAlign: "left", margin: "auto", width: "80%" }}>
            <Comment commentId={topComment.id} />
          </section>
        </div>
      </Provider>
    );
  }
}

export default App;
