import React from "react";
import {inject, observer} from 'mobx-react';
import InputWithLabel from "../../../components/InputWithLabel";
import {Button} from "react-bootstrap";
import HttpTemplate from '../../../App/components/HttpTemplate';

@inject('additionalInfoStore')
@observer
class BusinessLicense extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <InputWithLabel className="col-6"
                      label="사업자 등록증"
                      placeholder="선택된 파일이 없습니다"
                      inputType={'file'}
                      store={this.props.additionalInfoStore.inputBusinessLicense}
                      fileStore={this.props.additionalInfoStore.inputBusinessLicenseFile}
                      text={this.props.additionalInfoStore.businessLicense}
      >
      </InputWithLabel>
    )
  }
}

export default BusinessLicense;
