import React from "react";
import {inject, observer} from 'mobx-react';
import InputWithLabel from "../../../components/InputWithLabel";
import {Button} from "react-bootstrap";
import HttpTemplate from '../../../App/components/HttpTemplate';

@inject('additionalInfoStore')
@observer
class BusinessLicenseNumber extends React.Component {

  constructor(props) {
    super(props);
  }

  checkBusinessLicenseNumber = () => {
    HttpTemplate.get('/')
  };

  render() {
    return (
      <InputWithLabel className="col-6"
                      label="사업자 번호"
                      placeholder="회사 이름을 입력해 주세요"
                      store={this.props.additionalInfoStore.inputBusinessLicenseNumber}
                      text={this.props.additionalInfoStore.businessLicenseNumber}
      >
        <Button onClick={this.checkBusinessLicenseNumber}>사업자 번호 확인</Button>
      </InputWithLabel>
    )
  }
}

export default BusinessLicenseNumber;
