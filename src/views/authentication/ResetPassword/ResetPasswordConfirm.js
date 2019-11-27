import React from 'react';
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import ButtonLoader from "../../../components/ButtonLoader";
import http from "../../../App/components/HttpTemplate";
import {inject, observer} from "mobx-react";
import Password from "../Password";
import RepeatPassword from "../RepeatPassword";
import JSEncrypt from 'jsencrypt';

@inject(stores => ({
  password: stores.signUpStore.password,
  repeatPassword: stores.signUpStore.repeatPassword,
}))
@observer
class ResetPasswordConfirm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      emailInput : ''
    }
  }

  componentDidMount() {
    http.get('/api/auth/key').then((res) => {
      this.setState({
        'rsaPublicKey': res.data
      })
    });
  }

  resetPasswordHandle = () => {
    const promise = new Promise((resolve) => {
      resolve('result');
    });

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(this.props.password)) {
      alert('비밀번호 형식이 올바르지 않습니다.');
      return promise;
    }

    const rsaEncrypt = new JSEncrypt();
    rsaEncrypt.setPublicKey(this.state.rsaPublicKey);
    const {token} = this.props.match.params;
    return http.get(`/user/password/recover?token=${token}`).then(res => {
      if (res.status === 200) {
        const loginId = res.data;
        return http.put('/user/password/reset', {
          loginId: loginId,
          newPassword: rsaEncrypt.encrypt(this.props.password),
          newPasswordConfirm: rsaEncrypt.encrypt(this.props.repeatPassword)
        }).then((resetRes) => {
          if (resetRes.status === 200) {
            alert('비밀번호 변경이 완료되었습니다.');
            this.props.history.push('/auth/signin')
          } else {
            alert('토큰이 유효하지 않습니다.');
          }
        });
      } else {
        alert('토큰이 유효하지 않습니다.');
      }
    }).catch(error => {
      return false;
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
                <h3 className="col-12">비밀번호 리셋하기</h3>
                <Password/>
                <RepeatPassword/>
                <ButtonLoader class={'btn btn-primary shadow-2 mb-4'} process={this.resetPasswordHandle} text={'리셋하기'}/>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default ResetPasswordConfirm;
