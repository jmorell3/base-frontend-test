import React from "react";

import {LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip} from 'recharts';

import "./GraphPanel.css";
import "../App.css";

class GraphPanel extends React.Component {
  render() {
    return (
      <div>
          <p className="header">Values/time</p>
          <div className="graph-panel">
              <ResponsiveContainer>
                  <LineChart data={this.props.data}>
                      <Line name="Value 1" type="monotone" dataKey="value1" stroke="#a29ffa"/>
                      <Line name="Value 2" type="monotone" dataKey="value2" stroke="#53d7ff"/>
                      <CartesianGrid stroke="#ccc"/>
                      <XAxis dataKey="timestamp"/>
                      <YAxis/>
                      <Tooltip/>
                      <Legend/>
                  </LineChart>
              </ResponsiveContainer>
          </div>
      </div>
    );
  }
}

export default GraphPanel;
