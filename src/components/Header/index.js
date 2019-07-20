import React, { Component } from "react";
import "./style.css";

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar-container">
        <div className="navbar-title">
          <h1>Weather App</h1>
        </div>
      </nav>
    );
  }
}
