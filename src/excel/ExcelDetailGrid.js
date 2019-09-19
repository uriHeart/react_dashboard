import * as React from 'react';

import 'axui-datagrid/style.scss'; // or style.css
import { DataGrid } from 'axui-datagrid';
import windowSize from "react-window-size";
import { withRouter } from 'react-router-dom'

import axios from "axios";

interface IProps {

}
interface IState {
    gridData: any[];
    columns : any[];
}
class ExcelDetailGrid extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            gridData: [],
            columns : []
        }
    }

    componentDidMount(){
        const { indexId } = this.props.match.params
        console.log(indexId )

        axios.get("http://localhost:10001/excel/detail?indexId="+indexId ).then(res => {
            console.log(res.data)
            let columns =[];
            let gridData = [];

            res.data.forEach(function(sheet){
                sheet.sheetHeader.forEach(function(header){
                    columns.push({
                        key: header,
                        label: header,
                        width: 200,
                        align: 'center',
                    })
                })
                gridData = sheet.sheetData
            })

            this.setState({
                columns : columns,
                gridData: gridData
            })

            console.log(this)

        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const columns = this.state.columns;

        const  gridData  = this.state.gridData;

        return (
            <>
                <DataGrid
                    width ={800}
                    height={300}
                    data={gridData}
                    columns={columns}
                    options={{
                        showLineNumber: false,
                        showRowSelector: false,
                        asidePanelWidth: 900,
                        header: {
                            clickAction: 'sort',
                        },
                    }}
                    style={{ fontSize: '14px' }}
                    onClick={({ e, item, value, rowIndex, colIndex }) => {
                         console.log(item, value);
                    }}
                />
            </>
        );
    }
}

export default windowSize(ExcelDetailGrid);
