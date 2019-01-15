import React from "react";

import MainHeader from './header/MainHeader';
import GraphPanel from "./graph/GraphPanel";
import TablePanel from "./table/TablePanel";

import "./App.css";

const DATE_SEPARATOR = '-';
const DATE_TIME_SEPARATOR = 'T';
const TIME_SEPARATOR = ':';

const READING_ENDPOINT = 'http://localhost:8080/reading';

function getSummary(readings) {
  let index;
  const summary = [];
  let summaryIndex = 0;
  for (index = 0; index < readings.length; index++) {
    const timestamp = readings[index].timestamp;
    let fields = timestamp.split(' ');
    const time = fields[1];
    fields = time.split(TIME_SEPARATOR);
    const minutes = fields[1];
    if (minutes === '00') {
      const summaryItem = {
        value1: readings[index].value1,
        value2: readings[index].value2,
        timestamp: fields[0] + TIME_SEPARATOR + fields[1],
      }
      summary[summaryIndex] = summaryItem;
      summaryIndex++;
    }
  }
  return summary;
}

function getFormattedTime(time) {
  const year = time.getFullYear();
  const month = addLeftZero(time.getMonth()+1);
  const day = addLeftZero(time.getDate());
  const hour = addLeftZero(time.getHours());
  const minute = addLeftZero(time.getMinutes());
  const second = addLeftZero(time.getSeconds());
  return year + DATE_SEPARATOR + month + DATE_SEPARATOR + day + DATE_TIME_SEPARATOR + hour
      + TIME_SEPARATOR + minute + TIME_SEPARATOR + second;
}

function addLeftZero(number) {
  if (number < 10) {
    number = "0" + number;
  }
  return number;
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      readings: [],
      summary: [],
      selectedOption: null,
      readError: null
    };

    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.readSuccess = this.readSuccess.bind(this);
    this.readError = this.readError.bind(this);

    this.onCellBlur = this.onCellBlur.bind(this);
    this.updateSuccess = this.updateSuccess.bind(this);
    this.updateError = this.updateError.bind(this);

    this.formatTableItems = this.formatTableItems.bind(this);
    this.formatTableTimestamp = this.formatTableTimestamp.bind(this);
    this.formatTableValue = this.formatTableValue.bind(this);
  }

  handleTimeChange = (selectedOption) => {
    this.setState({ selectedOption });

    const currentTime = new Date();
    let currentFormattedTime = getFormattedTime(currentTime);

    if (selectedOption.value === 'lastSixHours') {
      currentTime.setHours(currentTime.getHours() - 6);
    } else if (selectedOption.value === 'lastTwelveHours') {
      currentTime.setHours(currentTime.getHours() - 12);
    }
    const start = getFormattedTime(currentTime);

    fetch(READING_ENDPOINT + '?start=' + start + '&end=' + currentFormattedTime)
        .then(response => response.json())
        .then(data => this.readSuccess(data))
        .catch(error => this.readError(error));
  }

  readSuccess(data) {
    data = this.formatTableItems(data);
    this.setState({ readings: data, summary: getSummary(data), readError: null })
  }

  readError(readError) {
    this.setState({ readError });
  }

  onCellBlur(e, cellInfo) {
      const readings = [...this.state.readings];
      readings[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
      this.setState({ readings: readings, summary: getSummary(readings) });
      fetch(READING_ENDPOINT, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: readings[cellInfo.index].id,
          value1: readings[cellInfo.index].value1,
          value2: readings[cellInfo.index].value2
        })
      })
          .then(response => this.updateSuccess(response))
          .catch(error => this.updateError(error));
    }

  updateSuccess(response) {
    console.log('Update success. Response = ' + response);
    this.handleTimeChange(this.props.selectedOption);
  }

  updateError(error) {
    console.log('Update error = ' + error.message);
  }

  formatTableItems(readings) {
    const formattedReadings = [];
    let index;
    for (index = 0; index < readings.length; index++) {
      const timestamp = readings[index].timestamp;
      const value1 = readings[index].value1;
      const value2 = readings[index].value2;

      const formattedTimestamp = this.formatTableTimestamp(timestamp);
      const formattedValue1 = this.formatTableValue(value1);
      const formattedValue2 = this.formatTableValue(value2);

      formattedReadings[index] = {
        id: readings[index].id,
        value1: formattedValue1,
        value2: formattedValue2,
        timestamp: formattedTimestamp
      }
    }
    return formattedReadings;
  }

  formatTableTimestamp(timestamp) {
    const fullFields = timestamp.split(DATE_TIME_SEPARATOR);
    let time = fullFields[1];
    const timeFields = time.split(TIME_SEPARATOR);
    time = timeFields[0] + TIME_SEPARATOR + timeFields[1];
    return fullFields[0] + ' ' + time;
  }

  formatTableValue(value) {
    return Math.round(value * 100) / 100;
  }

  render() {
    const { readings, summary, selectedOption, readError } = this.state;
    if (readError) {
      return (
          <div className="main-font">
            <MainHeader
                handleChange={this.handleTimeChange}
                selectedOption={selectedOption}
            />
            <p>{readError.message + ' Please retry'}</p>
          </div>
      );
    }
    return (
        <div className="main-font">
          <MainHeader
              handleTimeChange={this.handleTimeChange}
              selectedOption={this.state.selectedOption}
          />
          <GraphPanel data={summary}/>
          <TablePanel
              onCellBlur={this.onCellBlur}
              readings={readings}
              selectedOption={this.state.selectedOption}
          />
        </div>
    );
  }

}

export default App;
