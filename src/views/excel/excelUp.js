import React from 'react';
import {
    Row,
    Col,
    Button,
    Form
} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import Mcard from "../../App/components/MainCard";
import http from '../../App/components/HttpTemplate';
import BasicGrid from "./ExcelListGrid";

class ExcelUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            channels:[]
        }

        this.fileEvent = React.createRef();
        this.channel = React.createRef();
    }


    componentDidMount() {
        this.excelLIst()
        this.channelLIst()
    }


    handleFileInput(e){
        this.setState({
            selectedFile : e.target.files[0]
        })
    }

    handlePost = () => {

        //console.log(this.channel.current.value)

        if(this.state.selectedFile == null){
            alert("파일을 선택해 주세요.")
            return ;
        }

        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        formData.append('channelId', "1");
        formData.append('vendorId', "1");

        console.log(formData.getAll('file'))

        http.post("/excelUpload", formData).then(res => {
            console.log(res.data)
            this.setState({selectedFile : null})
            this.fileEvent.current.value = null;
            setInterval(()=>{
                this.excelLIst()
            },1000)
        }).catch(err => {
            console.log(err)
        })
    };

    excelLIst = () =>{

        http.get("/excel/list").then(res => {
            this.setState({gridData:res.data})
        }).catch(err => {
            console.log(err)
        })
    }

    channelLIst = () =>{

        http.get("/channels").then(res => {
            console.log(res)
            this.setState({channels:res.data})
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                        <Mcard title="파일등록">
                            <Form.Group>
                                <Col md={3}>
                                    <Form.Label>select channel</Form.Label>
                                    <Form.Control as="select" ref={this.channel}>
                                        {
                                         this.state.channels.map(function (channel) {
                                                return <option  key={channel.salesChannelId} value={channel.salesChannelId}>{channel.name}</option>
                                          })
                                        }
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group>
                                <Col md={5}>
                                    <input type="file" name="file" className="btn btn-primary" ref={this.fileEvent}
                                           onChange={ event => this.handleFileInput(event)}></input>
                                    <Button onClick={this.handlePost}>
                                        등록
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Mcard>
                        <Mcard title="등록파일 리스트">
                               <BasicGrid
                                   gridData={this.state.gridData}
                               >
                               </BasicGrid>
                        </Mcard>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default ExcelUpload;
