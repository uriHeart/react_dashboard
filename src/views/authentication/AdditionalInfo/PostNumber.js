import React from "react";
import {inject, observer } from 'mobx-react';
import { observe } from "mobx"
import InputWithLabel from "../../../components/InputWithLabel";
import {Button} from "react-bootstrap";
import HttpTemplate from '../../../App/components/HttpTemplate';
import SearchAddressModal from "./SearchAddressModal";

@inject(stores => ({
  postalNumber: stores.additionalInfoStore.postNumber,
  isClose: stores.additionalInfoStore.isClose,
  closeModal: stores.additionalInfoStore.closeModal,
  inputPostNumber: stores.additionalInfoStore.inputPostNumber
}))
@observer
class PostNumber extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  postAddressHandler = () => {
    this.props.closeModal(false);
  };

  render() {
    let searchModel;
    if (this.props.isClose) {
      searchModel = <div/>
    } else {
      searchModel = <SearchAddressModal/>
    }

    return (
      <InputWithLabel className="col-6"
                      label="사업자 주소"
                      placeholder="우편번호"
                      readOnly={true}
                      text={this.props.postalNumber}
      >
        {searchModel}
        <Button onClick={this.postAddressHandler}>우편번호 확인</Button>
      </InputWithLabel>
    )
  }
}

export default PostNumber;
