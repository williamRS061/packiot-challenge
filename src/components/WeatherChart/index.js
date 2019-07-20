import React, { Component } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { format } from "date-fns";
import api from "../../services/api";
import { NotificationError } from "../../utils/notifications";
import "./style.css";

export default class WeatherChart extends Component {
  state = {
    data: [],
    chartData: []
  };
  async componentDidMount() {
    try {
      const url = `/forecast?q=Florianopolis,br&units=metric&APPID=${
        process.env.REACT_APP_API_KEY
      }`;
      const response = await api.get(url);
      if (response) {
        this.setState({ data: response.data.list });
        this.mapDataToChart();
      }
    } catch (error) {
      NotificationError("Oops, an error occurred!");
      console.log(error);
    }
  }

  mapDataToChart = () => {
    const chartData = this.state.data.map(data => ({
      hour: format(data.dt_txt, "HH:mm"),
      temperature: data.main.temp
    }));
    chartData.splice(7, 33);
    this.setState({ chartData: chartData });
  };
  render() {
    return (
      <>
        <ResponsiveContainer width="85%" height={300}>
          <LineChart
            width={600}
            height={300}
            data={this.state.chartData}
            margin={{ top: 15, right: 0, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="7 7" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
        <p className="chart-description">Temperature tomorrow</p>
      </>
    );
  }
}
