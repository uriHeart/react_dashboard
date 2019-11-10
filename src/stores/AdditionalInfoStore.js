import { observable, action } from "mobx";

export default class AdditionalInfoStore {
  @observable businessType = '';
  @observable businessLicenseNumber = '';
  @observable representativeName = '';
  @observable businessAddress = '';
  @observable saleType = '';
  @observable saleForm = '';
  @observable businessLicense = '';

  @action inputBusinessType = (input) => {
    this.businessType = input;
  };
  @action inputBusinessLicenseNumber = (input) => {
    this.businessLicenseNumber = input;
  };
  @action inputRepresentativeName = (input) => {
    this.representativeName = input;
  };
  @action inputBusinessAddress = (input) => {
    this.businessAddress = input;
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
}
