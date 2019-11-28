import React, {Component} from 'react';
import windowSize from "react-window-size";
import ReactDataGrid from 'react-data-grid';
import lodingImg from "../../../assets/images/loading.gif";
import noData from "../../../assets/images/no-data-icon-10.jpg";

class Main extends Component {

    constructor(props) {
        super(props);
    }



    render() {

        const EmptyRowsView = () => {

            if(this.props.loading || this.props.noData){

                let image = this.props.loading == true ? lodingImg :noData;

                return (
                    <div
                        style={{ textAlign: "center", backgroundColor: "#f4f7fa", padding: "100px" }}
                    >
                        <img src={image}  width={150} height={150}/>
                    </div>
                );
            }else{
                return (<div></div>)
            }
        };

        return (
            <ReactDataGrid
                columns={this.props.mapper}
                rowGetter={(rowIdx) => {
                    let rows = this.props.row;
                    let project = Object.assign({}, rows[rowIdx]);

                    project.get = key => {
                        let splitKey = key.split(".");

                        if (key.includes('.')) {
                            let currentProject = project[splitKey[0]];
                            for (let i = 1; i < splitKey.length; i++) {
                                if (currentProject === undefined || currentProject[splitKey[i]] === undefined) {
                                    return '';
                                }
                                currentProject = currentProject[splitKey[i]]
                            }
                            return currentProject;
                        } else {
                            return project[key]
                        }
                    };

                    return project;
                }}
                rowsCount={this.props.row.length}
                // minHeight={900}
                emptyRowsView={EmptyRowsView}
                getCellActions={this.props.cellAction}
            />
        )
    }
}


export default windowSize(Main);


