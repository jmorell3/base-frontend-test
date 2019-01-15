import React from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";

import "./TablePanel.css"
import "../App.css";

class TablePanel extends React.Component {

  constructor(props) {
    super(props);
    this.renderEditable = this.renderEditable.bind(this);
    this.onCellBlur = this.onCellBlur.bind(this);
  }

  renderEditable(cellInfo) {
    return (
        <div
            style={{ backgroundColor: "#fafafa" }}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => this.onCellBlur(e, cellInfo)}
            dangerouslySetInnerHTML={{
              __html: this.props.readings[cellInfo.index][cellInfo.column.id]
            }}
        />
    );
  }

  onCellBlur(e, cellInfo) {
    this.props.onCellBlur(e, cellInfo);
  }

  render() {
    const columns = [{
      Header: 'Date/time',
      accessor: 'timestamp'
    },{
      Header: 'Value 1',
      accessor: 'value1',
      Cell: this.renderEditable
    },{
      Header: 'Value 2',
      accessor: 'value2',
      Cell: this.renderEditable
    }];
    return (
        <div>
          <p className="header">Table</p>
          <div className="table-panel">
            <ReactTable
                data={this.props.readings}
                columns={columns}
                className="-striped -highlight center"
            />
          </div>
        </div>
    );
  }
}

export default TablePanel;
