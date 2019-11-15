import React from 'react';
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import BusinessTypeSelect from "./BusinessTypeSelect";
import BusinessLicenseNumber from "./BusinessLicenseNumber";
import RepresentativeName from "./RepresentativeName";
import BusinessAddress from "./BusinessAddress";
import BusinessAddressDetail from "./BusinessAddressDetail";
import PostNumber from "./PostNumber";
import ButtonLoader from "../../../components/ButtonLoader";
import SaleForm from "./SaleForm";
import SaleType from "./SaleType";
import BusinessLicense from "./BusinessLicense";

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
                <h3 className="col-12" style={{marginBottom: 40}}>사업장 정보 입력</h3>
                <BusinessTypeSelect/>
                <BusinessLicenseNumber />
                <RepresentativeName />
                <PostNumber />
                <BusinessAddress />
                <BusinessAddressDetail />
                <SaleType/>
                <SaleForm/>
                <BusinessLicense/>
                <ButtonLoader class={'btn btn-primary shadow-2 mb-4'} process={this.registrationConfirmHandle} text={'등록하기'}/>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default Index;
