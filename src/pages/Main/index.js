import React, { Component } from "react";
import { Spinner } from "reactstrap";
import api from "../../services/api";
import { NotificationError } from "../../utils/notifications";
import WeatherChart from "../../components/WeatherChart";
import "./style.css";

export default class Main extends Component {
  state = {
    loading: "show",
    city: "",
    country: "",
    temperature: 0
  };

  async componentDidMount() {
    await this.getData();
    this.setState({ loading: "hide" });
  }

  getData = async () => {
    try {
      const url = `/weather?q=Florianopolis,br&units=metric&APPID=${
        process.env.REACT_APP_API_KEY
      }`;
      const response = await api.get(url);
      if (response) {
        console.log(response);
        this.setState({
          city: response.data.name,
          country: response.data.sys.country,
          temperature: response.data.main.temp
        });
      }
    } catch (error) {
      NotificationError("Oops, an error occurred!");
      console.log(error);
    }
  };
  render() {
    const temperature = this.state.temperature.toFixed();

    return (
      <div className="main-container">
        <div className={`loading ${this.state.loading}`}>
          <Spinner type="grow" />
        </div>
        <div className="custom-card">
          <i className="fa fa-temperature-low" style={{ fontSize: "38px" }}>
            {" "}
          </i>
          <p id="temperature">
            {temperature}ºC <span id="now">Now</span>
          </p>

          <p id="city">
            {this.state.city}, {this.state.country}
          </p>
        </div>
        <WeatherChart />
      </div>
    );
  }
}
