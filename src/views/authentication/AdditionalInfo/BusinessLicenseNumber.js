import React from "react";
import {inject, observer} from 'mobx-react';
import InputWithLabel from "../../../components/InputWithLabel";
import {Button} from "react-bootstrap";
import HttpTemplate from '../../../App/components/HttpTemplate';

@inject('additionalInfoStore')
@observer
class BusinessLicenseNumber extends React.Component {

  constructor(props) {
    super(props);
  }

  checkBusinessLicenseNumber = () => {
    // HttpTemplate.get('/businessLicenseNumber/{number}/companyName/{companyName}')
    const bizNumber = this.props.additionalInfoStore.businessLicenseNumber;
    if (!this.checkBizId(bizNumber)) {
      alert('상버자 번호가 올바르지 않습니다.\n숫자만 입력해 주세요.');
    } else {
      alert('확인되었습니다.');
    }
    this.props.additionalInfoStore.confirmBusinessLicenseNumber(this.checkBizId(bizNumber));

  };


  checkBizId = (bizID) => {
    if (bizID.trim() === '') {
      return false;
    }
    // bizID는 숫자만 10자리로 해서 문자열로 넘긴다.
    const checkID = [1, 3, 7, 1, 3, 7, 1, 3, 5, 1];
    let tmpBizID, i, chkSum = 0, c2, remander;
    bizID = bizID.replace(/-/gi, '');

    for (i = 0; i <= 7; i++) {
      chkSum += checkID[i] * bizID.charAt(i);
    }
    c2 = "0" + (checkID[8] * bizID.charAt(8));
    c2 = c2.substring(c2.length - 2, c2.length);
    chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
    remander = (10 - (chkSum % 10)) % 10;

    return Math.floor(bizID.charAt(9)) === remander;
  };

  render() {
    return (
      <InputWithLabel className="col-6"
                      label="사업자 번호"
                      placeholder="회사 이름을 입력해 주세요"
                      store={this.props.additionalInfoStore.inputBusinessLicenseNumber}
                      text={this.props.additionalInfoStore.businessLicenseNumber}
      >
        <Button onClick={this.checkBusinessLicenseNumber}>사업자 번호 확인</Button>
      </InputWithLabel>
    )
  }
}

export default BusinessLicenseNumber;
