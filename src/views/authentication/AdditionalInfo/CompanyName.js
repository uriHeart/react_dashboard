import React from "react";
import InputWithLabel from "../../../components/InputWithLabel";
import {inject} from 'mobx-react';

@inject('additionalInfoStore')
class CompanyName extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <InputWithLabel className="md-8"
                      label="사업자 유형"
                      placeholder="회사 이름을 입력해 주세요"
                      store={this.props.signUpStore.inputCompany}
      />
    )
  }
}

export default CompanyName;
