import React from 'react';
import {
  Row,
  Col,
  Button,
  Form,
  Popover,OverlayTrigger
} from 'react-bootstrap';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataGrid from '../../App/components/DataGride'
import moment from 'moment';
import Aux from "../../hoc/_Aux";
import http from '../../App/components/HttpTemplate';
import Mcard from "../../App/components/MainCard";
import Popup from "reactjs-popup";

import ko from 'date-fns/locale/ko';
registerLocale('ko',ko);


class Sku extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading : false,
      channels: [],
      startDate: moment.now(),
      endDate: moment.now(),
      gridData : [],
      parsedGridData :[]
    };
    this.channel = React.createRef();
  }

  componentDidMount() {
    this.channelLIst();
    this.getSku();
  }

  channelLIst = () => {
    http.get("/channels/1").then(res => {
      this.setState({channels: res.data})
    }).catch(err => {
      console.log(err)
    })
  };

  handleStartChange = date => {
    this.setState({
      startDate: date
    });
  };
  handleEndChange = date => {
    this.setState({
      endDate: date
    });
  };

  getSku = () =>{

    this.setState({loading:true})
    this.setState({gridData:[]})

    http.get("/sku").then(res => {

      this.setState({gridData : res.data})

      res.data.length==0 ? this.setState({noData : true,loading:false}) :  this.setState({noData : false,loading:false});

    })


  };




  render() {
    const timeFormat = ({value}) => {
      return <span>{`${moment(value).format('YYYY-MM-DD HH:mm:ss')}`}</span>
    };

    const popover = (
        <Popup  position="right center">
          <div>Popup content here !!</div>
        </Popup>
    );


    function getCellActions(column, row) {
      const cellActions = {
        imageUrl: [
          {
            icon: <div><img src={row.imageUrl} style={{height: 200, width:100}} /></div>,
            callback: () => {
              return ({popover})
            }
          }
        ]
      };
      return cellActions[column.key];
    }

    return (
        <Aux>
          <Mcard>
            <Row>
              <Col md={3}>
                <Form.Control as="select" ref={this.channel}>
                  <option  key="0" value="0">전체</option>
                  {

                    this.state.channels.map(function (channel) {
                      return <option  key={channel.salesChannelId} value={channel.salesChannelId}>{channel.salesChannelName}</option>
                    })
                  }
                </Form.Control>
              </Col>
              <DatePicker
                  locale="ko"
                  dateFormat="yyyy/MM/dd"
                  className="btn btn-primary"
                  selected={this.state.startDate}
                  onChange={this.handleStartChange}
              />
              <DatePicker
                  locale="ko"
                  dateFormat="yyyy/MM/dd"
                  className="btn btn-primary"
                  selected={this.state.endDate}
                  onChange={this.handleEndChange}
              />
              <Button onClick={this.getOrders}>
                검색
              </Button>
            </Row>
            <hr/>
            {/*<OrderGrid*/}
            {/*    gridData={this.state.gridData}*/}

            {/*>*/}
            {/*</OrderGrid>*/}

            <Form>
              <DataGrid
                  mapper={[
                    {key: 'brand', name: '브랜드',width: 150, resizable: true
                    },
                    {key: 'name', name: '상품명',width: 300, resizable: true},
                    {key: 'barcode', name: '바코드',width: 150, resizable: true},
                    {key: 'modelNumber', name: '모델번호',width: 150, resizable: true},
                    {key: 'imageUrl', name: '이미지',width: 100, resizable: true},
                  ]}
                  loading={this.state.loading}
                  noData={this.state.noData}
                  row={this.state.gridData}
                  cellAction={getCellActions}

              />
            </Form>
          </Mcard>

        </Aux>
    );
  }
}

export default Sku;