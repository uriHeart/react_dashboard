import * as React from 'react';
import http from '../../App/components/HttpTemplate';
import 'axui-datagrid/style.scss'; // or style.css
import DataGrid from '../../App/components/DataGride'
import {Col, Row,Alert} from "react-bootstrap";
import Mcard from "../../App/components/MainCard";
import Aux from "../../hoc/_Aux";import windowSize from "react-window-size";
import { withRouter } from 'react-router-dom'
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {confirmAlert} from "react-confirm-alert";

interface IProps {
    gridData: any[];
    channel: 0

}
interface IState {

}
class BasicGrid extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            gridData: [],
            alert:null,
            channel: this.props.channel
        }
        console.log(this.state)
    }
    componentDidMount() {
        this.excelLIst()
    }

    excelLIst() {
        http.get("/excel/list").then(res => {
            console.log(res.data)
            this.setState({gridData:res.data})
        }).catch(err => {
            console.log(err)
        })
    }


    deleteResultMessage() {
        const getAlert = () => (
            <Alert variant='success' onClose={ ()=>{
                this.setState({
                    alert: null
                })
            }} dismissible>
                삭제 되었습니다.
            </Alert>
        );

        this.setState({
            alert: getAlert()
        });

        setTimeout( this.hideAlert ,3000)
    }



    hideAlert = () => {
        this.setState({
            alert: null
        });
    }


    render() {

        const redirectDetail = (indexId) =>{
            localStorage.setItem('channelId', this.state.channel.current.value);
            this.props.history.push('/excel/detail'+indexId);
        }


        const defaultColumnProperties = {
            resizable: true
        };

        const deleteConfirm = (docId) => {

            confirmAlert({
                message: '삭제 하시겠습니까?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            deleteDocument(docId)
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => {}
                    }
                ]
            })
        }


        const deleteDocument = (docId) =>{
            http.delete("/excel/delete/?docId="+docId).then(res => {
                this.deleteResultMessage()

                let gridData = [...this.state.gridData];
                gridData.splice(docId,1)

                this.setState({gridData:gridData})

            }).catch(err => {
            })

        }

        const columns = [
            {
                key: 'upLoadDate',
                name: '등록일시',
                width: 200
            },
            {
                key: 'channelId',
                name: 'channelId',
                width: 200
            },
            {
                key: 'fileName',
                name: '등록파일명',
                width: 700,
                align: 'right',
                // events: {
                //     onClick: function(ev, args) {
                //         console.log(this)
                //         redirectDetail(args.rowId);
                //     }
                // }
            }
        ].map(c => ({ ...c, ...defaultColumnProperties }));

        function getCellActions(column, row) {
            const cellActions = {
                fileName: [
                    {
                        icon: <span className="feather icon-delete f-30 text-c-blue" />,
                        callback: () => {
                            deleteConfirm(row.id)
                        }
                    },
                    {
                        icon: "feather icon-external-link f-30 text-c-green",
                        callback: () => {
                            redirectDetail(row.id)
                        }
                    }
                ]
            };
            return cellActions[column.key];
        }

        return (
            <Aux>
                    <div>
                        <DataGrid
                            row={this.state.gridData}
                            mapper={columns}
                            cellAction={getCellActions}
                        />
                    </div>
                {this.state.alert}
            </Aux>
        );
    }
}

export default withRouter(windowSize(BasicGrid));
