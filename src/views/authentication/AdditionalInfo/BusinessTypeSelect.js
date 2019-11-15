import React from "react";
import {inject} from 'mobx-react';
import SelectBoxWithLabel from "../../../components/SelectBoxWithLabel";

@inject('additionalInfoStore')
class BusinessTypeSelect extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SelectBoxWithLabel className="md-8"
                      label="사업자 유형"
                      placeholder="회사 이름을 입력해 주세요"
                      store={this.props.additionalInfoStore.inputBusinessType}
      >
        <option value="1">개인사업자(간이과세자)</option>
        <option value="2">개인사업자(일반과세자)</option>
        <option value="3">법인사업자</option>
        <option value="3">면세사업자</option>
        <option value="3">해외사업자</option>
      </SelectBoxWithLabel>
    )
  }
}

export default BusinessTypeSelect;
