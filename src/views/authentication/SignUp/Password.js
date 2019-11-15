import React from "react";
import InputWithLabel from "../../../components/InputWithLabel";
import {inject, observer} from "mobx-react";

@inject('signUpStore')
@observer
class Password extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <InputWithLabel className="col-12"
                      label="비밀번호"
                      placeholder="영문+숫자+특수문자 조합 8자 이상"
                      inputType="password"
                      store={this.props.signUpStore.inputPassword}
                      text={this.props.signUpStore.password}
      />
    )
  }
}

export default Password;
