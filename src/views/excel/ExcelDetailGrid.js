import * as React from 'react';

import 'axui-datagrid/style.scss'; // or style.css
import { DataGrid } from 'axui-datagrid';
import windowSize from "react-window-size";
import Aux from "../../hoc/_Aux";
import Mcard from "../../App/components/MainCard";
import http from '../../App/components/HttpTemplate';


interface IProps {
}
interface IState {
}
class ExcelDetailGrid extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            gridData: []
        }
    }

    componentDidMount(){
        const { indexId } = this.props.match.params
        this.setState({loadingData:true})

        http.get("/excel/detail?indexId="+indexId ).then(res => {
            let gridData =res.data;
            this.setState({
                gridData: gridData
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        const gridData = this.state.gridData;
        const width = this.props.windowWidth - 370

        let i=0;
        const grid = gridData.map(sheetData => {
            i++;
            let columns = [];
            sheetData.sheetHeader.forEach(function (header) {
                columns.push({
                    key: header,
                    label: header,
                    width: 200,
                    align: 'center',
                })
            });

            let sheet = sheetData.sheetData;

            return (
                <Mcard title={sheetData.fileName} key={i}>
                    <DataGrid key={i}
                        width={width}
                        data={sheet}
                        columns={columns}
                        options={{
                            showLineNumber: false,
                            showRowSelector: false,
                            asidePanelWidth: 900,
                            header: {
                                clickAction: 'sort',
                            },
                        }}
                        style={{fontSize: '14px'}}

                    />
                </Mcard>
            );
        });

        return (
            <Aux>
                {grid}
            </Aux>
        );
    }
}

export default windowSize(ExcelDetailGrid);
