import React from 'react';
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import ButtonLoader from "../../../components/ButtonLoader";
import http from "../../../App/components/HttpTemplate";

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      emailInput : ''
    }
  }

  resetPasswordHandle = () => {
    const mail = this.state.emailInput;
    return http.get(`/user/password/passwordRecovery/${mail}`).then(res => {
      alert('login 화면으로 이동합니다.\n이메일을 확인해 주세요.');
      this.props.history.push('/auth/signin')
    }).catch(error => {
      alert(error.response.data.message);
      return false;
    });
  };

  emailInputChange = (event) => {
    this.setState({
      emailInput: event.target.value
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
                <h3 className="col-12">비밀번호 리셋</h3>
                <input type='text' className="form-control" placeholder={'아이디 (이메일주소)'} onChange={this.emailInputChange}
                       value={this.state.emailInput } />
                <ButtonLoader class={'btn btn-primary shadow-2 mb-4'} process={this.resetPasswordHandle} text={'비밀번호 리셋 이메일 보내기'}/>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default Index;
