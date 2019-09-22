import React, {Component} from 'react';
import windowSize from "react-window-size";
import ReactDataGrid from 'react-data-grid';

class Main extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ReactDataGrid
        columns={this.props.mapper}
        rowGetter={(rowIdx) => {
          let rows = this.props.row;
          let project = Object.assign({}, rows[rowIdx]);

          project.get = key => {
            let splitKey = key.split(".");

            if (key.includes('.')) {
              let currentProject = project[splitKey[0]];
              for (let i = 1; i < splitKey.length; i++) {
                if (currentProject === undefined || currentProject[splitKey[i]] === undefined) {
                  return '';
                }
                currentProject = currentProject[splitKey[i]]
              }
              return currentProject;
            } else {
              return project[key]
            }
          };

          return project;
        }}
        rowsCount={this.props.row.length}
        // minHeight={900}
      />
    )
  }
}


export default windowSize(Main);


