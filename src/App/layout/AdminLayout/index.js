import React, { Component, Suspense } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Fullscreen from "react-full-screen";
import windowSize from 'react-window-size';

import Navigation from './Navigation';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';
import Loader from "../Loader";
import routes from "../../../routes";
import Aux from "../../../hoc/_Aux";
import * as actionTypes from "../../../store/actions";
import http from '../../components/HttpTemplate';

import './app.scss';

window.$vendorId = 0;
window.$dashboardUrl = "";
window.$totalDashboardUrl = "";

class AdminLayout extends Component {

    fullScreenExitHandler = () => {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            this.props.onFullScreenExit();
        }
    };

    componentWillMount() {
        if (this.props.windowWidth > 992 && this.props.windowWidth <= 1024 && this.props.layout !== 'horizontal') {
            this.props.onComponentWillMount();
        }
    }

    mobileOutClickHandler() {
        if (this.props.windowWidth < 992 && this.props.collapseMenu) {
            this.props.onComponentWillMount();
        }
    }

    async check() {
    //     const auth = localStorage.getItem('auth');
    //     if (auth !== 'true') {
    //         window.location.href = '/#/auth/signin';
    //         return ;
    //     }
    //     await http.get("/api/check/auth").then(res => {
    //         if (res.data.success === true) {
    //             // this.props.loginDispatch();
    //             window.$vendorId = res.data.vendorId;
    //             window.$dashboardUrl = res.data.dashboardUrl;
    //             window.$totalDashboardUrl = res.data.totalDashboardUrl;
    //         } else {
    //             localStorage.clear();
    //             window.location.href = '/#/auth/signin';
    //         }
    //     }).catch(err => {
    //         console.log(err)
    //     })
    }

    render() {

        this.check();

        /* full screen exit call */
        document.addEventListener('fullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('webkitfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('mozfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('MSFullscreenChange', this.fullScreenExitHandler);

        const fakeAuth = {
            isAuthenticated: true,
            authenticate(cb) {
                this.isAuthenticated = true;
                setTimeout(cb, 100);
            },
            signout(cb) {
                this.isAuthenticated = false;
                setTimeout(cb, 100);
            }
        };

        const menu = routes.map((route, index) => {
            return (route.component) ? (
              route.isPublic ? (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                        <route.component {...props} />
                    )} />
              ) : (
                fakeAuth.isAuthenticated ? (<Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <route.component {...props} />
                  )} />) : (<Redirect to='/auth/signin-1' />)
              )
            ) : null;
        });

        return (
            <Aux>
                <Fullscreen enabled={this.props.isFullScreen}>
                    <Navigation />
                    <NavBar />
                    <div className="pcoded-main-container" onClick={() => this.mobileOutClickHandler}>
                        <div className="pcoded-wrapper">
                            <div className="pcoded-content">
                                <div className="pcoded-inner-content">
                                    <Breadcrumb />
                                    <div className="main-body">
                                        <div className="page-wrapper">
                                            <Suspense fallback={<Loader/>}>
                                                <Switch>
                                                    {menu}
                                                    <Redirect from="/" to={this.props.defaultPath} />
                                                </Switch>
                                            </Suspense>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fullscreen>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        defaultPath: state.defaultPath,
        isFullScreen: state.isFullScreen,
        collapseMenu: state.collapseMenu,
        configBlock: state.configBlock,
        layout: state.layout
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFullScreenExit: () => dispatch({type: actionTypes.FULL_SCREEN_EXIT}),
        onComponentWillMount: () => dispatch({type: actionTypes.COLLAPSE_MENU})
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (windowSize(AdminLayout));
