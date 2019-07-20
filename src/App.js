import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Main from "./pages/Main";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Header />
        <Main />
      </div>
    );
  }
}
