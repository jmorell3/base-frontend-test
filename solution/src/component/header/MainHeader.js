import React from "react";
import Select from 'react-select';

import "./MainHeader.css";
import "../App.css";

const options = [
  { value: 'lastSixHours', label: 'Last 6 hours' },
  { value: 'lastTwelveHours', label: 'Last 12 hours' }
];

class MainHeader extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleTimeChange(e);
  }

  render() {
    return (
        <table className="main-header">
          <tbody>
          <tr>
            <td>Reading Manager</td>
            <td>
              <div className="right-align">
                <Select
                    value={this.props.selectedOption}
                    onChange={this.handleChange}
                    options={options}
                />
              </div>
            </td>
          </tr>
          </tbody>
        </table>
    );
  }
}

export default MainHeader;
