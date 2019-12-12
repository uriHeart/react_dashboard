import * as React from 'react';

import DataGrid from '../../App/components/DataGride'
import windowSize from "react-window-size";
import Aux from "../../hoc/_Aux";
import Mcard from "../../App/components/MainCard";
import http from '../../App/components/HttpTemplate';
import {Button, Col, Row, Badge, ProgressBar} from "react-bootstrap";



class ExcelDetailGrid extends React.Component {
    constructor(props: IProps) {
        super(props);
        this.state = {
            gridData: [],
            indexId: "",
            total:0,
            upLoading:false,
            progressVisible:"none",
            progressNow: 10,

        }
    }

    componentDidMount(){
        const param = this.props.match.params
        http.get("/excel/detail?indexId="+param.indexId ).then(res => {
            let gridData =res.data;
            console.log(gridData)
            this.setState({
                gridData: gridData,
                indexId : param.indexId,
                total: gridData[0].sheetData.length
            })
        }).catch(err => {
            console.log(err)
        })
    }


    emptyGrid = () =>{
        return (
            <Mcard title="data search" >
                <Aux>
                    <div>
                        <DataGrid
                            loading={true}
                            row={[]}
                            mapper={[]}
                        />
                    </div>
                </Aux>
            </Mcard>
        )

    }

    eventConfirm =() =>{
        const formData = new FormData();
        formData.append('docId', this.state.indexId);
        formData.append('channelId', localStorage.getItem("channelId"));
        formData.append('vendorId', window.$vendorId);

        this.setState({upLoading:true})
        this.setState({progressVisible:""})
        setTimeout(this.addProgressNow,1000)

        http.put("/excel/event/confirm", formData).then(res => {
            alert("확정 되었습니다.");
            this.props.history.push('/excel-upload');

        }).catch(err => {
            this.setState({
                progressVisible:"none",
                progressNow:10,
                upLoading:false
            });
            console.log(err)
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

    render() {

        const defaultColumnProperties = {
            resizable: true
        };

        const gridData = this.state.gridData;

        let view = this.emptyGrid();


        if(gridData==""){
             return view;
        }

        const width = this.props.windowWidth - 370

        let i=0;
        const grid = gridData.map(sheetData => {

            i++;
            let columns = [];
            sheetData.sheetHeader.forEach(function (header) {
                columns.push({
                    key: header,
                    name: header,
                    width: 200,
                    resizable: true
                })
            });

            let sheet = sheetData.sheetData;


            return (
                <Mcard title={this.state.indexId} key={i}>
                    <Button onClick={this.eventConfirm}>
                        등록 확정
                    </Button>
                    <Aux>
                        <div>
                            <DataGrid

                                row={sheet}
                                mapper={columns}
                            />
                            <h5>
                                total count <Badge variant="secondary">{this.state.total}</Badge>
                            </h5>
                        </div>
                        <div>
                            <Row>
                                <Col>
                                    <div style={{display:this.state.progressVisible}}>
                                        <ProgressBar animated now={this.state.progressNow} />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Aux>
                </Mcard>
            );
        });
        view = grid;

        return (
            <Aux>
                <Row>
                    <Col>
                     {view}
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default windowSize(ExcelDetailGrid);
