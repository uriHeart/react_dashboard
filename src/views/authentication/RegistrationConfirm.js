import React from 'react';
import './../../assets/scss/style.scss';
import Aux from "../../hoc/_Aux";
import Breadcrumb from "../../App/layout/AdminLayout/Breadcrumb";
import ButtonLoader from "../../components/ButtonLoader";
import http from "../../App/components/HttpTemplate";

class RegistrationConfirm extends React.Component {

  constructor(props) {
    super(props);
  }

  registrationConfirmHandle = () => {
    const {uuid} = this.props.match.params;
    return http.get(`/api/auth/confirm/${uuid}`).then(res => {
      alert(`${res.data}\nlogin 화면으로 이동합니다.\n추가 정보를 등록해 주세요.`);
      this.props.history.push('/auth/signin/' + encodeURIComponent('/auth/additional-info'))
    }).catch(error => {
      alert(error.response.data.message);
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
                <h3 className="col-12">회원 인증</h3>

                <ButtonLoader class={'btn btn-primary shadow-2 mb-4'} process={this.registrationConfirmHandle} text={'Confirm'}/>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default RegistrationConfirm;
