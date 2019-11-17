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
import {inject, observer} from "mobx-react";
import HttpTemplate from '../../../App/components/HttpTemplate';

@inject('additionalInfoStore')
@observer
class Index extends React.Component {

  constructor(props) {
    super(props);
  }

  additionalInfoHandle = () => {
    const promise = new Promise((resolve) => {
      resolve('result');
    });
    const store = this.props.additionalInfoStore;
    if (store.businessType.trim() === '') {
      alert('사업자 유형을 선택해 주세요.');
      return promise;
    }

    if (!store.businessLicenseNumberConfirmed) {
      alert('사업자 번호를 확인해 주세요.');
      return promise;
    }

    if (store.representativeName.trim() === '') {
      alert('대표자 이름을 입력해 주세요.');
      return promise;
    }

    if (store.businessAddress === '') {
      alert('주소를 입력해 주세요.');
      return promise;
    }

    if (store.businessAddress2.trim() === '') {
      alert('상세주소를 입력해 주세요.');
      return promise;
    }

    if (store.saleForm.trim() === '') {
      alert('업태를 입력해 주세요.');
      return promise;
    }

    if (store.saleType.trim() === '') {
      alert('업종을 입력해 주세요.');
      return promise;
    }

    if (store.businessLicense === '') {
      alert('사업자 등록증을 추가해 주세요.');
      return promise;
    }

    const formData = new FormData();
    formData.append('file', store.businessLicenseFile);
    formData.append('businessType', store.businessType);
    formData.append('licenseNumber', store.businessLicenseNumber);
    formData.append('representativeName', store.representativeName);
    formData.append('postCode', store.postNumber);
    formData.append('baseAddress', store.businessAddress);
    formData.append('detailAddress', store.businessAddress2);
    formData.append('saleForm', store.saleForm);
    formData.append('saleType', store.saleType);
    return HttpTemplate.post('/userInfo/additionalInfo', formData, {
      'Content-Type': 'multipart/form-data'
    }).then(res => {

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
                <h3 className="col-12" style={{marginBottom: 40}}>사업장 정보 입력</h3>
                <BusinessTypeSelect/>
                <BusinessLicenseNumber/>
                <RepresentativeName/>
                <PostNumber/>
                <BusinessAddress/>
                <BusinessAddressDetail/>
                <SaleForm/>
                <SaleType/>
                <BusinessLicense/>
                <ButtonLoader class={'btn btn-primary shadow-2 mb-4'}
                              process={this.additionalInfoHandle}
                              text={'등록하기'}/>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default Index;
