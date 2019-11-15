import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { FormGroup, FormLabel, FormControl} from 'react-bootstrap';

export default class SelectBoxWithLabel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ' '
    }
  }

  inputChange = (event) => {
    this.props.store(event.target.value);
  };

  render() {
    const inputLabelStyle = {textAlign: 'left', alignSelf: 'center'};

    return (
      <div>
        <div className="input-group mb-12">
          <span className="col-4"
                style={inputLabelStyle}>{this.props.label}</span>
          <div className={'col-8'}>
            <select className="browser-default custom-select" onChange={this.inputChange}>
              {this.props.children}
            </select>
          </div>
        </div>
      </div>
    )
  }
}
