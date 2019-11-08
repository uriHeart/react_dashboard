import React from "react";
import InputWithLabel from "./InputWithLabel";
import {inject} from "mobx-react";

@inject('signUpStore')
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
      />
    )
  }
}

export default Password;
