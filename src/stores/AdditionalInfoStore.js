import { observable, action } from "mobx";

export default class AdditionalInfoStore {
  @observable businessType = '';
  @observable businessLicenseNumber = '';
  @observable representativeName = '';
  @observable postNumber = '';
  @observable businessAddress = '';
  @observable businessAddress2 = '';
  @observable saleType = '';
  @observable saleForm = '';
  @observable businessLicense = '';
  @observable isClose = true;

  @action inputBusinessType = (input) => {
    this.businessType = input;
  };
  @action inputBusinessLicenseNumber = (input) => {
    this.businessLicenseNumber = input;
  };
  @action inputRepresentativeName = (input) => {
    this.representativeName = input;
  };
  @action inputPostNumber = (input) => {
    this.postNumber = input;
  };
  @action inputBusinessAddress = (input) => {
    this.businessAddress = input;
  };
  @action inputBusinessAddress2 = (input) => {
    this.businessAddress2 = input;
  };
  @action inputSaleType = (input) => {
    this.saleType = input;
  };
  @action inputSaleForm = (input) => {
    this.saleForm = input;
  };
  @action inputBusinessLicense = (input) => {
    this.businessLicense = input;
  };
  @action closeModal = (close) => {
    this.isClose = close;
  }
}
