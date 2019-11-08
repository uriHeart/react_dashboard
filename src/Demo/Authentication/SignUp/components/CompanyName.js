import React from "react";
import InputWithLabel from "./InputWithLabel";
import {inject} from 'mobx-react';

@inject('signUpStore')
class CompanyName extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <InputWithLabel className="md-8"
                      label="회사명"
                      placeholder="회사 이름을 입력해 주세요"
                      store={this.props.signUpStore.inputCompany}
      />
    )
  }
}

export default CompanyName;
