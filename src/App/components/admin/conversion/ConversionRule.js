import React from 'react';

import '../../../../assets/scss/style.scss';
import AggregateConversion from "./rules/AggregateConversion";
import ConversionTemplateConversion from "./rules/ConversionTemplateConversion";
import DirectConversion from "./rules//DirectConversion";
import JsonConversion from "./rules/JsonConversion";
import OperationConversion from "./rules/OperationConversion";
import SqlConversion from "./rules/SqlConversion";
import http from '../../../../App/components/HttpTemplate'
import {Dropdown} from "react-bootstrap";

class ConversionRule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceField: '',
            targetField: '',
            conversionTypes:[],
            conversionType:'',
/*            operatorClass:'',
            operatorMethod:'',
            operatorParams:{},
            jsonMap:{},
            conversionTemplateSourceId:'',
            conversionTemplateTargetId:'',
            sqlString:'',*/

        }

        this.handleConversionType = this.handleConversionType.bind(this);
        this.conversionRuleInput = this.conversionRuleInput.bind(this);
    }

    componentDidMount() {
        http.get('/data/getConversionTypes')
            .then((res) => {
                this.setState({
                    conversionTypes: res.data
                })
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.conversionType !== this.state.conversionType) {
            return this.conversionRuleInput;
        }
    }

    handleConversionType = (event) => {
        this.setState({conversionType: event.target.value});
    }

    conversionRuleInput = () => {
        return (
            <div>
                {(function() {
                    switch(this.state.conversionType) {
                        case 'DIRECT':
                            return <DirectConversion />;
                        case 'OPERATION':
                            return <OperationConversion />;
                        case 'SQL':
                            return <SqlConversion />;
                        case 'JSON':
                            return <JsonConversion />;
                        case 'AGGREGATE':
                            return <AggregateConversion />;
                        case 'CONVERSION_TEMPLATE':
                            return <ConversionTemplateConversion />;
                        default:
                            return null;
                    }
                })()}
            </div>
        );
    }

    render() {
        return <div className="drop-down">
            <Dropdown
                placeholder='Conversion Type'
                fluid
                selection
                onSelect={this.handleConversionType}
                options={this.state.conversionTypes.map((x) =>
                    ({
                        "key": x,
                        "text": x,
                        "value": x
                    }))}
            />
        </div>;

    }
}

export default ConversionRule;