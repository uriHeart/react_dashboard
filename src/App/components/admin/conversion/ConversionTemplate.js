import React from 'react';

import '../../../../assets/scss/style.scss';
import http from '../../../../App/components/HttpTemplate'
import { Dropdown } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import ConversionRule from "./ConversionRule";

class ConversionTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: '',
            target: '',
            sources: [],
            targets: [],
            conversionRules: []
        }

        this.addConversionRule = this.addConversionRule.bind(this);
    }

    componentDidMount() {
        http.get('/data/getConversionTypes')
            .then((res) => {
                this.setState({
                    values: res.data
                })
            });

        http.get('/channels/all')
            .then((res) => {
                this.setState({
                    sources: res.data
                })
            });

        http.get('/data/getTargetList')
            .then((res) => {
                this.setState({
                    targets: res.data
                })
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.target !== this.state.target) {
            return this.conversionRule;
        }
    }

    addConversionRule = () => {
        this.state.conversionRules.push(<ConversionRule/>);
    }

    render() {
        return <div className="drop-down">
            <Dropdown
                placeholder='Select Source'
                fluid
                selection
                options={this.state.sources.map((x) =>
                    ({
                        "key": x["salesChannelName"],
                        "text": x["salesChannelName"],
                        "value": x["salesChannelName"]
                    }))}
            />

            <Dropdown
                placeholder='Select Target'
                fluid
                selection
                options={this.state.targets.map((x) =>
                    ({
                        "key": x,
                        "text": x,
                        "value": x
                    }))}
            />

            <Button positive onClick={this.addConversionRule}>Add Rule</Button>

            <div id="display-data-Container">
                {this.state.conversionRules}
            </div>
        </div>;
    }
}

export default ConversionTemplate;