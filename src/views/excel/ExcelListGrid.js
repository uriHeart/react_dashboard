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
                        columnHeight:35,
                        showLineNumber: true,
                        showRowSelector: false,
                        asidePanelWidth: 900,
                        header: {
                            clickAction: 'sort',
                        },
                        scroller :{
                            horizontalScrollerWidth:85
                        }
                    }}
                    styles={{
                        elHeight:305
                    }}
                    style={{ fontSize: '17px' ,elHeight: 305 }}
                    onClick={({ e, item, value, rowIndex, colIndex }) => {
                        this.redirectDetail(item.id);
                    }}
                />
            </>
        );
    }
}

export default withRouter(windowSize(BasicGrid));
