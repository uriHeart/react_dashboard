import React from "react";
import InputWithLabel from "../../../components/InputWithLabel";
import {inject, observer} from "mobx-react";

@inject('signUpStore')
@observer
class ManagerName extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <InputWithLabel className="md-8"
                      label="담당자명"
                      placeholder="담당자 이름을 입력해 주세요"
                      store={this.props.signUpStore.inputManagerName}
                      text={this.props.signUpStore.managerName}
      />
    )
  }
}

export default ManagerName
