import React from 'react';
import {
    Row,
    Col,
    Button,
    Card,
    OverlayTrigger,
    Tooltip,
    Table
} from 'react-bootstrap';

import Aux from "../hoc/_Aux";
import Mcard from "../App/components/MainCard";
import axios from "axios";
import BasicGrid from "./excelUp_bck";

class ExcelUpload extends React.Component {
    state = {
        selectedFile: null,
        fileInput : React.createRef(),
        gridData:[]
    }


    handleFileInput(e){
        console.log("dddddddddd")
        this.setState({
            selectedFile : e.target.files[0],
        })
    }

    handlePost = () => {
        this.setState({gridData :[{"a":"22"}]})
        console.log(this);

    };

    handlePost1(){
        console.log(this);

        // console.log(this.selectedFile)
        //
        // const formData = new FormData();
        // formData.append('file', this.state.selectedFile);
        // formData.append('channelId', "1");
        //
        // formData.append('vendorId', "1");
        //
        // console.log(formData.getAll('file'))
        // return axios.post("http://localhost:10001/excelUpload", formData).then(res => {
        //     alert('성공')
        // }).catch(err => {
        //     alert('실패')
        // })
    }

    render() {
        const buttonVariants = [
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'info',
            'light',
            'dark',
        ];

        const buttonOptions = [
            {variant: 'primary', icon:'feather icon-thumbs-up'},
            {variant: 'secondary', icon:'feather icon-camera'},
            {variant: 'success', icon:'feather icon-check-circle'},
            {variant: 'danger', icon:'feather icon-slash'},
            {variant: 'warning', icon:'feather icon-alert-triangle'},
            {variant: 'info', icon:'feather icon-info'}
        ];

        return (
            <Aux>
                <Row>
                    <Col>
                        <Mcard title="파일등록">
                            <input type="file" name="file" className="btn btn-primary"
                                   onChange={ event => this.handleFileInput(event)}></input>
                            <Button onClick={this.handlePost}>
                                등록
                            </Button>
                            <p>use <code>variant="*"</code> props in component <code>Button</code> to get various button</p>

                        </Mcard>
                        <Card>
                               <BasicGrid
                                   outW={300}
                                   gridData={this.state.gridData}
                               >
                               </BasicGrid>
                        </Card>
                    </Col>
                </Row>
                {/*<Row>*/}
                {/*    <Col>*/}
                {/*        <Card title="Basic Dropdown Button">*/}
                {/*            <ButtonToolbar>*/}
                {/*                {basicDropdownButton}*/}
                {/*            </ButtonToolbar>*/}
                {/*        </Card>*/}
                {/*        <Card title="Split Dropdown Button">*/}
                {/*            <ButtonToolbar>*/}
                {/*                {splitDropdownButton}*/}
                {/*            </ButtonToolbar>*/}
                {/*        </Card>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
            </Aux>
        );
    }
}

export default ExcelUpload;
