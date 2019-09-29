import * as React from 'react';

import 'axui-datagrid/style.scss'; // or style.css
import { DataGrid } from 'axui-datagrid';
import windowSize from "react-window-size";
import { withRouter } from 'react-router-dom'

interface IProps {
    gridData: any[];

}
interface IState {

}
class BasicGrid extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    redirectDetail(indexId){
        this.props.history.push('/excel/detail'+indexId);
    }

    render() {
        const columns = [
            {
                key: 'upLoadDate',
                label: '등록일시',
                width: 200,
                align: 'center',
            },
            {
                key: 'fileName',
                label: '등록파일명',
                width: 500,
                align: 'center'
            }
        ];

        const  gridData  = this.props.gridData;

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
                         this.redirectDetail(item.id);
                    }}
                />
            </>
        );
    }
}

export default withRouter(windowSize(BasicGrid));
