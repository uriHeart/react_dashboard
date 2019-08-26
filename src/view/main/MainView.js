import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect';

class MainView extends Component {

  render() {
    return (
      <div>
        hello~
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return({
    state: state,
    cookies: ownProps.cookies,
  });
};
export const MainViewContainer = connect(
  mapStateToProps,
  null
)(MainView);

export default MainViewContainer;


