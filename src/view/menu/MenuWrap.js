import React, { Component } from 'react';
import Drawer from 'react-motion-drawer';
import { connect } from 'react-redux'
import { openMenu } from '../../actions/Actions'
import MenuItem from './MenuItem'

class MenuWrap extends Component {
  change = (ch) => {
    if (!ch) {
      this.props.closeMenu();
    }
  };

  render() {
    return (
      // https://reactjsexample.com/navigation-drawer-built-with-the-awesome-react-motion-and-react-hammerjs/
      <Drawer drawerStyle={{
        background: '#eceff1',
        marginTop: '45px',
        boxShadow: '0 0.5rem 1rem rgba(0,0,0,.05), inset 0 -1px 0 rgba(0,0,0,.1)'
      }} overlayColor={''} noTouchOpen={true} open={this.props.isOpen} onChange={this.change}>
        <ul className="list-group">
          <MenuItem path='/login' title={'sign in'} />
          <MenuItem path='/register' title={'sign up'} />
          <MenuItem path='/menu1' title={'Menu1'} />
        </ul>
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => ({
  isOpen: state.value
});
const mapDispatchToProps = (dispatch) => ({
  closeMenu: () => dispatch(openMenu(false))
});

MenuWrap = connect(mapStateToProps, mapDispatchToProps)(MenuWrap);
export default MenuWrap;
