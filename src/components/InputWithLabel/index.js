import React from "react";

export default class InputWithLabel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ' '
    }
  }

  inputChange = (event) => {
    this.props.store(event.target.value);
  };

  isValid = () => {

  };

  render() {
    const inputLabelStyle = {textAlign: 'left', alignSelf: 'center'};
    const inputTextStyle = {
      border: '1px solid lightgrey'
    };

    return (
      <div>
        <div className="input-group mb-12">
          <span className="col-4"
                style={inputLabelStyle}>{this.props.label}</span>
          <input type={this.props.inputType || 'text'} className="form-control"
                 style={inputTextStyle}
                 placeholder={this.props.placeholder}
                 onChange={this.inputChange}/>
        </div>
        <text>
          {this.state.errorMessage}
        </text>
      </div>
    )
  }
}
