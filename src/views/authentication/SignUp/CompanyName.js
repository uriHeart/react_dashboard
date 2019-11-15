import React from "react";
import InputWithLabel from "../../../components/InputWithLabel";
import {inject, observer} from 'mobx-react';

@inject('signUpStore')
@observer
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
                      text={this.props.signUpStore.company}
      />
    )
  }
}

export default CompanyName;
