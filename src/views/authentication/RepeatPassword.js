import React from "react";
import InputWithLabel from "../../components/InputWithLabel";
import {inject, observer} from "mobx-react";

@inject('signUpStore')
@observer
class RepeatPassword extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <InputWithLabel className="md-8"
                      label="비밀번호 확인"
                      placeholder="비밀번호를 한 번 더 입력해주세요"
                      inputType="password"
                      store={this.props.signUpStore.inputRepeatPassword}
                      text={this.props.signUpStore.repeatPassword}
      />
    )
  }
}

export default RepeatPassword;
