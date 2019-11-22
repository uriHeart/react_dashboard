import { observable, action } from "mobx";

export default class SignUpStore {
  @observable email = '';
  @observable password = '';
  @observable repeatPassword = '';
  @observable company = '';
  @observable managerName = '';
  @observable phoneNumber = '';
  @observable serviceTerm = false;
  @observable privacyTerm = false;

  @action inputEmail = (input) => {
    this.email = input;
  };
  @action inputPassword = (input) => {
    this.password = input;
  };
  @action inputRepeatPassword = (input) => {
    this.repeatPassword = input;
  };
  @action inputCompany = (input) => {
    this.company = input;
  };
  @action inputManagerName = (input) => {
    this.managerName = input;
  };
  @action inputPhoneNumber = (input) => {
    this.phoneNumber = input;
  };
  @action checkServiceTerm = (input) => {
    this.serviceTerm = input;
  };
  @action checkPrivacyTerm = (input) => {
    this.privacyTerm = input;
  };
}
