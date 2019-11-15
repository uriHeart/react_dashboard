import React from "react";
import {inject, observer} from 'mobx-react';
import InputWithLabel from "../../../components/InputWithLabel";
import {Button} from "react-bootstrap";
import HttpTemplate from '../../../App/components/HttpTemplate';

@inject('additionalInfoStore')
@observer
class SaleForm extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <InputWithLabel className="col-6"
                      label="업종"
                      placeholder="사업자 등록증에 기재된 업태를 입력해 주세요"
                      store={this.props.additionalInfoStore.inputSaleForm}
                      text={this.props.additionalInfoStore.saleForm}
      />
    )
  }
}

export default SaleForm;
