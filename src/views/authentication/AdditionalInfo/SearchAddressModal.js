import React from 'react';
import './Modal.scss';
import DaumPostcode from 'react-daum-postcode';
import {inject} from "mobx-react";

@inject('additionalInfoStore')
class SearchAddressModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleAddress = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}`
          : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    this.props.additionalInfoStore.inputPostNumber(data.postcode);
    this.props.additionalInfoStore.inputBusinessAddress(fullAddress);
    this.props.additionalInfoStore.closeModal(true);
  };

  confirmHandler() {
    this.props.additionalInfoStore.closeModal(true);
  }

  render() {
    return (
      <React.Fragment key='1'>
        <div className="Modal-overlay"/>
        <div className="Modal">
          <p className="title">주소검색</p>
          <div className="content">
            <DaumPostcode
              onComplete={this.handleAddress}
            />
          </div>
          <div className="button-wrap">
            <button onClick={this.confirmHandler.bind(this)}>Close</button>
          </div>
        </div>
      </React.Fragment>

    )
  }
}

export default SearchAddressModal;
