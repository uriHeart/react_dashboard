import React from "react";
import {inject} from "mobx-react";

@inject('signUpStore')
class TermsView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allCheck: false,
      serviceTerm: false,
      privacyTerm: false
    }
  }

  allCheckHandle = event => {
    this.props.signUpStore.checkServiceTerm(event.target.checked);
    this.props.signUpStore.checkPrivacyTerm(event.target.checked);
    this.setState({
      allCheck: event.target.checked,
      serviceTerm: event.target.checked,
      privacyTerm: event.target.checked
    });
  };

  serviceTermHandle = event => {
    this.props.signUpStore.checkServiceTerm(event.target.checked);
    this.setState({
      serviceTerm: event.target.checked
    });
  };

  PrivacyTermHandle = event => {
    this.props.signUpStore.checkPrivacyTerm(event.target.checked);
    this.setState({
      privacyTerm: event.target.checked
    });
  };

  render() {
    return (
      <div>
        <div>
          <label>
            이용약관에 모두 동의합니다.
            <input type="checkbox" onChange={this.allCheckHandle} value={this.state.allCheck} checked={this.state.allCheck}/>
          </label>
        </div>
        <div>
          <label>
            ARGO 서비스 이용약관 (필수)
            <button>약관 보기</button>
          </label>
          <input type="checkbox" onChange={this.serviceTermHandle} value={this.state.serviceTerm}  checked={this.state.serviceTerm}/>
        </div>
        <div>
          <label>
            개인정보 취급방침 (필수)
            <button>약관 보기</button>
          </label>
          <input type="checkbox" onChange={this.PrivacyTermHandle} value={this.state.privacyTerm} checked={this.state.privacyTerm}/>
        </div>
      </div>
    )
  }
}

export default TermsView;
