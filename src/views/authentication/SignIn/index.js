import React from 'react';
import {NavLink} from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import JSEncrypt from 'jsencrypt';
import http from '../../../App/components/HttpTemplate'

window.$vendorId = 0;
window.$dashboardUrl = "";
window.$totalDashboardUrl = "";

class SignUp1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginId: '',
            password: ''
        }
    }

    componentDidMount() {
        this.getRsaPublicKey();
    }

    getRsaPublicKey() {
        http.get('/api/auth/key').then((res) => {
            this.setState({
                'rsaPublicKey': res.data
            })
        });
    }

    handleLogin = () => {
        const rsaEncrypt = new JSEncrypt();
        rsaEncrypt.setPublicKey(this.state.rsaPublicKey);
        http.post('/api/auth/login', {
            loginId: this.state.loginId,
            password: rsaEncrypt.encrypt(this.state.password)
        }).then(res => {
            if (res.data.success === true) {
                localStorage.setItem('auth', 'true');
                localStorage.setItem('userId', res.data.userId);
                window.$vendorId = res.data.vendorId;
                window.$dashboardUrl = res.data.dashboardUrl;
                window.$totalDashboardUrl = res.data.totalDashboardUrl;

                const {redirect} = this.props.match.params;
                if (redirect !== undefined && redirect !== '') {
                    this.props.history.push(decodeURIComponent(redirect));
                } else {
                    this.props.history.push('/dashboard');
                }
            } else {
                alert(res.data.message);
                this.getRsaPublicKey();
            }
        }).catch(error => {
            console.log('error');
        });
    };

    changeInputId = (event) => {
        this.setState({
            loginId: event.target.value
        })
    };

    changeInputPassword = (event) => {
        this.setState({
            password: event.target.value
        })
    };

    render () {
        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">Login</h3>
                                <div className="input-group mb-3">
                                    <input type="loginId" className="form-control" placeholder="loginId" onChange={this.changeInputId}/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="password" onKeyDown={(e)=>{if(e.key==='Enter')this.handleLogin()}} onChange={this.changeInputPassword}/>
                                </div>
                                <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                            <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                    </div>
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4" onClick={this.handleLogin}>Login</button>
                                <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password">Reset</NavLink></p>
                                <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup">Signup</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default SignUp1;
