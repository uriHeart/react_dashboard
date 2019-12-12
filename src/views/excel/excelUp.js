import React from 'react';
import {
    Row,
    Col,
    Button,
    InputGroup,
    ProgressBar,
    Form
} from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import Mcard from "../../App/components/MainCard";
import http from '../../App/components/HttpTemplate';
import BasicGrid from "./ExcelListGrid";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class ExcelUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            channels: [],
            progressVisible: "none",
            progressNow: 10,
            uploading:false
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

    addProgressNow = ()=>{
        this.setState({
            progressNow : this.state.progressNow + 10
        })

        if(this.state.progressVisible===""){
            setTimeout(this.addProgressNow,1000)
        }

        if(this.state.progressNow>=100){
            this.setState({
                progressNow : 10
            })
        }
    }

    overrideConfirm = () => {
        confirmAlert({
            title: '동일한 파일명이 등록되어있습니다.',
            message: ' 등록되어있는 파일을 덮어쓰겠습니까?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.handlePost()
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    }

    existsExcel = () =>{
        if(this.state.selectedFile == null){
            alert("파일을 선택해 주세요.")
            return ;
        }

        if(this.state.upLoading){
            alert("등록중입니다.");
            return;
        }

        let fileName = this.state.selectedFile.name

        http.get("/excel?fileName="+fileName ).then(res => {

            if(res.data==true){
                this.overrideConfirm()
            }else{
                this.handlePost(fileName)
            }
        }).catch(err => {
            this.setState({
                progressVisible:"none",
                progressNow:10,
                upLoading:false
            })
            console.log(err)
        })
    }

    handlePost = () => {
        const fileName = this.state.selectedFile.name;
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        formData.append('channelId', this.channel.current.value);
        formData.append('vendorId', window.$vendorId);

        this.setState({upLoading:true})
        this.setState({progressVisible:""})
        setTimeout(this.addProgressNow,1000)

        http.post("/excelUpload", formData).then(res => {
            this.setState({selectedFile : null})
            this.fileEvent.current.value = null;
            localStorage.setItem('channelId', this.channel.current.value)
            alert("등록 되었습니다.");
            this.props.history.push('/excel/detail'+fileName);

        }).catch(err => {
            this.setState({
                progressVisible:"none",
                progressNow:10,
                upLoading:false
            });
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

        http.get("/channels/1").then(res => {
            this.setState({channels:res.data})
            console.log(this.state)
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
                            <Row>
                                <Col md={3}>
                                        <Form.Control as="select" ref={this.channel}>
                                            {
                                                this.state.channels.map(function (channel) {
                                                    return <option  key={channel.salesChannelId}
                                                                    value={channel.salesChannelId}
                                                                    onChange={ event => alert(event)} >{channel.salesChannelName}</option>
                                                })
                                            }
                                        </Form.Control>
                                </Col>
                                <Col md={2.5}>
                                    <input type="file" name="file" className="btn btn-primary"  ref={this.fileEvent}
                                           onChange={ event => this.handleFileInput(event)}></input>
                                </Col>
                                <Col>
                                    <Button onClick={this.existsExcel}>
                                        등록
                                    </Button>

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div style={{height:10}}>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div style={{display:this.state.progressVisible}}>
                                        <ProgressBar animated now={this.state.progressNow} />
                                    </div>
                                </Col>
                            </Row>
                        </Mcard>
                        <Mcard title="등록파일 리스트">
                            <BasicGrid
                                gridData={this.state.gridData}
                                channel={this.channel}
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
