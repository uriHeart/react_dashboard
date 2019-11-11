import React from 'react';

import '../../../../../assets/scss/style.scss';
import http from '../../../../../App/components/HttpTemplate'

class ConversionTemplateConversion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceField: '',
            targetField: '',
        }
    }

    state = {
        values: []
    }
    componentDidMount() {
        http.get('/data/getConversionTypes')
            .then((res) => {
                this.setState({
                    values: res.data
                })
            });
    }
    handleConversionType = (event) => {
        console.log(event.target.value);
        this.setState({conversionType: event.target.value});
    }

    render() {
        return <div className="drop-down">
            <p>I would like to render a dropdown here from the values object</p>
            <select onChange={this.handleConversionType} value={this.state.value} placeholder="Select Conversion Type">{
                this.state.values.map((obj) => {
                    return <option value={obj}>{obj}</option>
                })
            }</select>
            }
        </div>;
    }
}

export default ConversionTemplateConversion;