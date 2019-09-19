import React, {Component} from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MenuWrap from './view/menu/MenuWrap';
import Header from './view/menu/Header';

import LoginView from './view/auth/LoginView';
import RegisterView from './view/auth/RegisterView';
import Order from "./view/order";
import {connect} from "react-redux";
import {withCookies} from 'react-cookie';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <MenuWrap/>
          <Header/>
          <div>
            <Switch>
              <Route path='//' component={LoginView}/>
              <Route path='/login' component={LoginView}/>
              <Route path='/register' component={RegisterView}/>
              <Route path='/order' component={Order}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.value
});
App = withCookies(App);
export default connect(mapStateToProps, null)(App);
