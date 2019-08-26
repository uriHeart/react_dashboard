import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { openMenu } from '../../actions/Actions';
import connect from 'react-redux/es/connect/connect';

class MenuItem extends Component {
  static defaultProps = {
    active: ''
  };
  render() {
    return (
      <li onClick={this.props.closeMenu} className="list-group-item list-group-item-secondary">
        <NavLink to={this.props.path} activeClassName={this.props.active}>{this.props.title}</NavLink>
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  closeMenu: () => (dispatch(openMenu(false)))
});

MenuItem = connect(null, mapDispatchToProps)(MenuItem);

export default MenuItem;
