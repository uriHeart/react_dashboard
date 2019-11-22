import React from "react";
import InputWithLabel from "../../../components/InputWithLabel";
import {inject, observer} from "mobx-react";

@inject('signUpStore')
@observer
class PhoneNumber extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <InputWithLabel className="md-8"
                      label="휴대폰 번호"
                      placeholder="담당자 휴대폰 번호를 숫자만 입력해 주세요"
                      store={this.props.signUpStore.inputPhoneNumber}
                      text={this.props.signUpStore.phoneNumber}
      />
    )
  }
}

export default PhoneNumber;
