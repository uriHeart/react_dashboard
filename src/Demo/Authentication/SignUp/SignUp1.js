import React from 'react';
import {NavLink} from 'react-router-dom';
import TermsView from './TermsView'
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import http from '../../../App/components/HttpTemplate'
import JSEncrypt from 'jsencrypt';
import EmailId from "./components/EmailId";
import Password from "./components/Password";
import RepeatPassword from "./components/RepeatPassword";
import CompanyName from "./components/CompanyName";
import PhoneNumber from "./components/PhoneNumber";
import ManagerName from "./components/ManagerName";
import {inject, observer} from "mobx-react";

@inject(stores => ({
  email: stores.signUpStore.email,
  password: stores.signUpStore.password,
  repeatPassword: stores.signUpStore.repeatPassword,
  company: stores.signUpStore.company,
  managerName: stores.signUpStore.managerName,
  phoneNumber: stores.signUpStore.phoneNumber,
  serviceTerm: stores.signUpStore.serviceTerm,
  privacyTerm: stores.signUpStore.privacyTerm
}))
@observer
class SignUp1 extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    http.get('/api/auth/key').then((res) => {
      this.setState({
        'rsaPublicKey': res.data
      })
    });
  }

  handleRegisterUser = () => {
    if (!this.props.serviceTerm || !this.props.privacyTerm) {
      alert('약관에 동의해 주세요.');
      return;
    }

    const emailRegx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!this.props.email.match(emailRegx)) {
      alert('email 형식이 올바르지 않습니다.');
      return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(this.props.password)) {
      alert('비밀번호 형식이 올바르지 않습니다.');
      return;
    }

    if (this.props.password !== this.props.repeatPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const emptyRegx = /^\s+|\s+$/g;
    if (this.props.managerName.replace(emptyRegx, "") === '') {
      alert('담당자명을 입력해 주세요.');
      return;
    }

    if (this.props.company.replace(emptyRegx, "") === '') {
      alert('회사명을 입력해 주세요.');
      return;
    }

    const numberRegx = /^[0-9]*$/;
    if (!numberRegx.test(this.props.phoneNumber)) {
      alert('핸드폰 번호를 입력해주세요.');
      return;
    }
    const rsaEncrypt = new JSEncrypt();
    rsaEncrypt.setPublicKey(this.state.rsaPublicKey);
    http.post('/api/auth/seller-register', {
      email: this.props.email,
      password: rsaEncrypt.encrypt(this.props.password),
      company: this.props.company,
      managerName: this.props.managerName,
      phoneNumber: this.props.phoneNumber
    }).then(res => {
      alert('확인 이메일이 발송되었습니다.\nlogin 화면으로 이동합니다.');
      this.props.history.push('/auth/signin-1')
    }).catch(error => {
      alert(error.response.data.message);
    });
  };

  render() {
    return (
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
              <div className="col-12 card-body text-center">
                <h3 className="col-12">벤더 가입</h3>
                <EmailId/>
                <Password/>
                <RepeatPassword/>
                <ManagerName/>
                <CompanyName/>
                <PhoneNumber/>
                <TermsView/>
                <button className="btn btn-primary shadow-2 mb-4"
                        onClick={this.handleRegisterUser}>가입하기
                </button>
                <p className="mb-0 text-muted">Allready have an
                  account? <NavLink to="/auth/signin-1">Login</NavLink></p>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default SignUp1;
