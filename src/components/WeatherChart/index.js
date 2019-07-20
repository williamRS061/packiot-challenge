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
      hour: format(data.dt_txt, "hh:mm a"),
      temperature: data.main.temp
    }));
    chartData.splice(7, 33);
    this.setState({ chartData: chartData });
  };
  render() {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    return (
      <>
        <ResponsiveContainer width="85%" height={300}>
          <LineChart
            width={600}
            height={300}
            data={this.state.chartData}
            margin={{ top: 15, right: 0, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="temperature" stroke="#769AEE" />
            <CartesianGrid stroke="#ccc" strokeDasharray="7 7" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip formatter={value => value.toFixed() + "ºC"} />
          </LineChart>
        </ResponsiveContainer>
        <p className="chart-description">
          Weather for tomorrow {format(date, "dddd Do")}
        </p>
      </>
    );
  }
}
