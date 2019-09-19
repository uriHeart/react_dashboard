import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect';
import ReactDataGrid from 'react-data-grid';
import http from "../../utils/HttpTemplate";

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      row: []
    }
  }

  componentDidMount() {
    // http.post(this.props.url, this.props.param)
    //   .then(res => {
    //     this.setState({
    //       row: res.data
    //     })
    //   }).catch(err => {
      this.setState({
        row: [{
          vendor: {
            vendorName: 'nike'
          },
          orderProduct: {
            productName: '최신 신발',
            productPrice: {
              salesPrice: 10000
            }
          },
          collectedAt: new Date().getTime(),
          orderedAt: new Date().getTime()
        }, {
          vendor: {
            vendorName: 'nike'
          },
          orderProduct: {
            productName: '올드 신발',
            productPrice: {
              salesPrice: 5000
            }
          },
          collectedAt: new Date().getTime(),
          orderedAt: new Date().getTime()
        }]
      });
    // });
  }

  render() {
    return (
      <ReactDataGrid
        columns={this.props.mapper}
        rowGetter={(rowIdx) => {
          let rows = this.state.row;
          let project = Object.assign({}, rows[rowIdx]);

          project.get = key => {
            let splitKey = key.split(".");

            if (key.includes('.')) {
              let currentProject = project[splitKey[0]];
              for (let i = 1; i < splitKey.length; i++) {
                if (currentProject[splitKey[i]] === undefined) {
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
        rowsCount={this.state.row.length}
        // minHeight={900}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    state: state,
    cookies: ownProps.cookies,
  });
};
export const MainViewContainer = connect(
  mapStateToProps,
  null
)(Main);

export default MainViewContainer;


