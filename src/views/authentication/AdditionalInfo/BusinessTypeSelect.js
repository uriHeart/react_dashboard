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
        <option value=''>선택해 주세요 </option>
        <option value="SELF_EMPLOYED_SIMPLE">개인사업자(간이과세자)</option>
        <option value="SELF_EMPLOYED_NORMAL">개인사업자(일반과세자)</option>
        <option value="LEGAL_EMPLOYED">법인사업자</option>
        <option value="DUTY_FREE_EMPLOYED">면세사업자</option>
        <option value="OVERSEAS_EMPLOYED">해외사업자</option>
      </SelectBoxWithLabel>
    )
  }
}

export default BusinessTypeSelect;
