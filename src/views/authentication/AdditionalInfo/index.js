import React from 'react';
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import ButtonLoader from "../../../components/ButtonLoader";
import http from "../../../App/components/HttpTemplate";

class Index extends React.Component {

  constructor(props) {
    super(props);
  }

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
                <h3 className="col-12">준비 중입니다.</h3>
                {/*<ButtonLoader class={'btn btn-primary shadow-2 mb-4'} process={this.registrationConfirmHandle} text={'Confirm'}/>*/}
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default Index;
