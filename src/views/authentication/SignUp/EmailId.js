import React from "react";
import InputWithLabel from "../../../components/InputWithLabel";
import {inject, observer} from "mobx-react";

@inject('signUpStore')
@observer
class EmailId extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <InputWithLabel
        label="아이디(이메일 주소)"
        placeholder="이메일 형식으로 입력해주세요"
        store={this.props.signUpStore.inputEmail}
        text={this.props.signUpStore.email}
      />
    )
  }
}

export default EmailId;
