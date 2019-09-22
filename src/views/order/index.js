import React from 'react';
import {
  Row,
  Col,
  Button,
  Form
} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import DataGrid from '../../App/components/DataGride'
import moment from 'moment';
import Aux from "../../hoc/_Aux";
import http from '../../App/components/HttpTemplate';

class ExcelUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      startDate: moment.now(),
      endDate: moment.now()
    };
    this.channel = React.createRef();
  }

  componentDidMount() {
    this.channelLIst();
  }

  channelLIst = () => {
    http.get("/channels").then(res => {
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

  render() {
    const timeFormat = ({value}) => {
      return <span>{`${moment(value).format('YYYY-MM-DD HH:mm:ss')}`}</span>
    };

    return (
      <Aux>
        <Row>
          <Col>
            <Row>
              <Form.Group>
                <Form.Label>select channel</Form.Label>
                <Form.Control as="select" ref={this.channel}>
                  {
                    this.state.channels.map(function (channel) {
                      return <option key={channel.id}
                                     value={channel.id}>{channel.name}</option>
                    })
                  }
                </Form.Control>
              </Form.Group>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleStartChange}
              />
              <DatePicker
                selected={this.state.endDate}
                onChange={this.handleEndChange}
              />
              <Button>검색</Button>
            </Row>
            <DataGrid mapper={[
              {key: 'orderId', name: '주문아이디'},
              {key: 'orderedAt', name: '주문일시', formatter: timeFormat},
              {key: 'collectedAt', name: '발주일시', formatter: timeFormat},
              {key: 'paidAt', name: '결제일시', formatter: timeFormat},
              {key: 'totalQuantity', name: '총 수량'},
              {key: 'orderState', name: '오더 상태'},
              {key: 'orderStateDescription', name: '오더 상태 설명'},
              {key: 'vendor.vendorId', name: 'vendorId'},
              {key: 'vendor.vendorName', name: 'vendorName'},
              {key: 'salesChannel.salesChannelId', name: 'salesChannelId'},
              {key: 'salesChannel.salesChannelCode', name: 'salesChannelCode'},
              {key: 'salesChannel.salesChannelName', name: 'salesChannelName'},
              {key: 'salesChannel.baseUrl', name: 'baseUrl'},
              {key: 'orderProduct.productId', name: '벤더아이템 아이디 (상품아이디)'},
              {key: 'orderProduct.productName', name: '벤더아이템 이름 (상품명)'},
              {key: 'orderProduct.productDesc', name: '벤더아이템 설명 (상풍 설명)'},
              {key: 'orderProduct.quantity', name: '상품 수량'},
              {key: 'orderProduct.productPrice.paymentMethod', name: '결제방법'},
              {key: 'orderProduct.productPrice.originalPrice', name: '판매원가'},
              {key: 'orderProduct.productPrice.salesPrice', name: '실판매가'},
              {key: 'orderProduct.productPrice.paymentAmount', name: '결제금액'},
              {key: 'orderProduct.applyType', name: '주문, 교환, 취소(배송전), 반품(배송후)'},
              {key: 'orderAddress.originalAddress.address1', name: '고객 원본 주소1'},
              {key: 'orderAddress.originalAddress.address2', name: '고객 원본 주소2'},
              {
                key: 'orderAddress.originalAddress.fullAddress',
                name: '고객 원본 전체주소'
              },
              {
                key: 'orderAddress.originalAddress.postalCode',
                name: '고객 원본 우편번호'
              },
              {
                key: 'orderAddress.refinedAddress.roadAddress',
                name: '정제된 도로명 주소'
              },
              {
                key: 'orderAddress.refinedAddress.jibunAddress',
                name: '정제된 지번 주소'
              },
              {key: 'orderAddress.refinedAddress.roadName', name: '정제된 도로명'},
              {
                key: 'orderAddress.refinedAddress.postalCode5',
                name: '정제된 5자리 우편번호'
              },
              {
                key: 'orderAddress.refinedAddress.postalCode6',
                name: '정제된 6자리 우편번호'
              },
              {
                key: 'orderAddress.refinedAddress.buildingMainNumber',
                name: '정제된 건물 주번지'
              },
              {
                key: 'orderAddress.refinedAddress.buildingSubNumber',
                name: '정제된 건물 부번지'
              },
              {
                key: 'orderAddress.refinedAddress.buildingName',
                name: '정제된 건물 이름'
              },
              {
                key: 'orderAddress.refinedAddress.buildingDong',
                name: '정제된 건물 동'
              },
              {key: 'orderAddress.refinedAddress.buildingHo', name: '정제된 건물 호'},
              {key: 'orderAddress.refinedAddress.longitude', name: '경도'},
              {key: 'orderAddress.refinedAddress.latitude', name: '위도'},
              {key: 'orderAddress.recipient.name', name: '수취인 이름'},
              {key: 'orderAddress.recipient.phoneNumber1', name: '수취인 전화번호1'},
              {key: 'orderAddress.recipient.phoneNumber2', name: '수취인 전화번호2'},
              {key: 'orderAddress.orderer.phoneNumber2', name: '주문자 이름'},
              {key: 'orderAddress.orderer.phoneNumber1', name: '주문자 전화번호1'},
              {
                key: 'orderAddress.deliveryRequest.deliveryRequest',
                name: '배송요청사항'
              },
            ]} row={[{
              vendor: {
                vendorName: 'nike'
              },
              orderProduct: {
                productName: '최신 신발',
                productPrice: {
                  salesPrice: 10000
                }
              },
              collectedAt: new Date().getTime(),
              orderedAt: new Date().getTime()
            }, {
              vendor: {
                vendorName: 'nike'
              },
              orderProduct: {
                productName: '올드 신발',
                productPrice: {
                  salesPrice: 5000
                }
              },
              collectedAt: new Date().getTime(),
              orderedAt: new Date().getTime()
            }]}/>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default ExcelUpload;
