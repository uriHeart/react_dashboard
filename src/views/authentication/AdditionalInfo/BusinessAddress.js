import React from "react";
import {inject, observer} from 'mobx-react';
import InputWithLabel from "../../../components/InputWithLabel";
import SearchAddressModal from "./SearchAddressModal";

@inject('additionalInfoStore')
@observer
class BusinessAddress extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <InputWithLabel className="col-6"
                      label=""
                      placeholder="우편번호 확인 시 입력되는 주소입니다"
                      readOnly={true}
                      text={this.props.additionalInfoStore.businessAddress}
      />
    )
  }
}

export default BusinessAddress;
