import React from 'react';
import {NavLink} from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import http from '../../../App/components/HttpTemplate'
import JSEncrypt from 'jsencrypt';

class SignUp1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginId: '',
            password: ''
        }
    }

    componentDidMount() {
        http.get('/api/auth/key').then((res) => {
            this.setState({
                'rsaPublicKey': res.data
            })
        });
    }

    handleRegisterUser = () => {
        const rsaEncrypt = new JSEncrypt();
        rsaEncrypt.setPublicKey(this.state.rsaPublicKey);
        http.post('/api/auth/seller-register', {
            loginId: this.state.loginId,
            password: rsaEncrypt.encrypt(this.state.password)
        }).then(res => {
            alert('login 화면으로 이동합니다.');
            this.props.history.push('/auth/signin-1')
        }).catch(error => {
            alert(error.response.data.message);
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
                                    <i className="feather icon-user-plus auth-icon"/>
                                </div>
                                <h3 className="mb-4">Sign up</h3>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Username" onChange={this.changeInputId}/>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Email"/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="password" onChange={this.changeInputPassword}/>
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4" onClick={this.handleRegisterUser}>Sign up</button>
                                <p className="mb-0 text-muted">Allready have an account? <NavLink to="/auth/signin-1">Login</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default SignUp1;
