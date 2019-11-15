import React from "react";
import {inject, observer} from 'mobx-react';
import InputWithLabel from "../../../components/InputWithLabel";
import {Button} from "react-bootstrap";
import HttpTemplate from '../../../App/components/HttpTemplate';

@inject('additionalInfoStore')
@observer
class BusinessType extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <InputWithLabel className="col-6"
                      label="대표자명"
                      placeholder="대표자 이름을 입력해 주세요"
                      store={this.props.additionalInfoStore.inputRepresentativeName}
                      text={this.props.additionalInfoStore.representativeName}
      />
    )
  }
}

export default BusinessType;
