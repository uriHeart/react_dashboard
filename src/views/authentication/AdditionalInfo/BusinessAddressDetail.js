import React from "react";
import {inject, observer} from 'mobx-react';
import InputWithLabel from "../../../components/InputWithLabel";
import {Button} from "react-bootstrap";
import HttpTemplate from '../../../App/components/HttpTemplate';

@inject('additionalInfoStore')
@observer
class BusinessAddressDetail extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <InputWithLabel className="col-6"
                      label=""
                      placeholder="상세주소를 입력해 주세요"
                      store={this.props.additionalInfoStore.inputBusinessAddress2}
                      text={this.props.additionalInfoStore.businessAddress2}
      />
    )
  }
}

export default BusinessAddressDetail;
