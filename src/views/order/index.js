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
import Mcard from "../../App/components/MainCard";
import OrderGrid from "./OrderGrid";
import Workbook from 'react-excel-workbook'

class ExcelUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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

  getOrders = () =>{
    const formData = {
      //데이터조회가 안됨으로 하기 3개파라미터 제외
      // 'from': this.state.startDate,
      // 'to': this.state.endDate,
      //'salesChannelId': this.channel.current.value,
      'vendorId': 1
    };
    console.log(this)
     http.post("/orders", formData).then(res => {

      this.setState({gridData : res.data})
      console.log(res.data)
       const excelDownData =[];

       res.data.forEach(row =>{
          const raw ={
            'orderId':row.orderId,
            'orderedAt': moment(row.orderedAt).format('YYYY-MM-DD HH:mm:ss'),
            'collectedAt' : moment(row.paidAt).format('YYYY-MM-DD HH:mm:ss'),
            'paidAt' : moment(row.paidAt).format('YYYY-MM-DD HH:mm:ss'),
            'totalQuantity': row.totalQuantity,
            'orderState': row.orderState,
            'orderStateDescription': row.orderStateDescription,
            'vendorvendorId': row.vendor.vendorId,
            'vendorvendorName': row.vendor.vendorName,
            'salesChannelsalesChannelId': row.salesChannel.salesChannelId,
            'salesChannelsalesChannelCode': row.salesChannel.salesChannelCode,
            'salesChannelsalesChannelName': row.salesChannel.salesChannelName,
            'salesChannelbaseUrl': row.salesChannel.baseUrl,
            'orderProductproductId': row.orderProduct.productId,
            'orderProductproductName': row.orderProduct.productName,
            'orderProductproductDesc': row.orderProduct.productDesc,
            'orderProductquantity': row.orderProduct.quantity,
            'orderProductproductPricepaymentMethod': row.orderProduct.productPrice.paymentMethod,
            'orderProductproductPriceoriginalPrice': row.orderProduct.productPrice.originalPrice,
            'orderProductproductPricesalesPrice': row.orderProduct.productPrice.salesPrice,
            'orderProductproductPricepaymentAmount': row.orderProduct.productPrice.paymentAmount,
            'orderProductapplyType': row.orderProduct.applyType,
            'orderAddressoriginalAddressaddress1': row.orderAddress.originalAddress.address1,
            'orderAddressoriginalAddressaddress2': row.orderAddress.originalAddress.address2,
            'orderAddressoriginalAddressfullAddress': row.orderAddress.originalAddress.fullAddress,
            'orderAddressoriginalAddresspostalCode': row.orderAddress.originalAddress.postalCode,
            'orderAddressrefinedAddressroadAddress': row.orderAddress.refinedAddress.roadAddress,
            'orderAddressrefinedAddressjibunAddress': row.orderAddress.refinedAddress.jibunAddress,
            'orderAddressrefinedAddressroadName': row.orderAddress.refinedAddress.roadName,
            'orderAddressrefinedAddresspostalCode5': row.orderAddress.refinedAddress.postalCode5,
            'orderAddressrefinedAddresspostalCode6': row.orderAddress.refinedAddress.postalCode6,
            'orderAddressrefinedAddressbuildingMainNumber': row.orderAddress.refinedAddress.buildingMainNumber,
            'orderAddressrefinedAddressbuildingSubNumber': row.orderAddress.refinedAddress.buildingSubNumber,
            'orderAddressrefinedAddressbuildingName': row.orderAddress.refinedAddress.buildingName,
            'orderAddressrefinedAddressbuildingDong': row.orderAddress.refinedAddress.buildingDong,
            'orderAddressrefinedAddressbuildingHo': row.orderAddress.refinedAddress.buildingHo,
            'orderAddressrefinedAddresslongitude': row.orderAddress.refinedAddress.longitude,
            'orderAddressrefinedAddresslatitude': row.orderAddress.refinedAddress.latitude,
            'orderAddressrecipientname': row.orderAddress.recipient.name,
            'orderAddressrecipientphoneNumber1': row.orderAddress.recipient.phoneNumber1,
            'orderAddressrecipientphoneNumber2': row.orderAddress.recipient.phoneNumber2,
            'orderAddressorderername': row.orderAddress.orderer.name,
            'orderAddressordererphoneNumber1': row.orderAddress.orderer.phoneNumber1,
            'orderAddressordererphoneNumber2': row.orderAddress.orderer.phoneNumber2,
            'orderAddressdeliveryRequestdeliveryRequest': row.orderAddress.deliveryRequest.deliveryRequest
          }
         excelDownData.push(raw)
       })


       this.setState({parsedGridData : excelDownData})

     }).catch(err => {
      console.log(err)
    })
  };

  _export;
  export = () => {
    this._export.save();
  }

  render() {

    const timeFormat = ({value}) => {
      return <span>{`${moment(value).format('YYYY-MM-DD HH:mm:ss')}`}</span>
    };

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
                  <DatePicker className="btn btn-primary"
                    selected={this.state.startDate}
                    onChange={this.handleStartChange}
                  />
                  <DatePicker className="btn btn-primary"
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
            <DataGrid mapper={[
            {key: 'orderId', name: '주문아이디',width: 150},
            {key: 'orderedAt', name: '주문일시', formatter: timeFormat,width: 150},
            {key: 'collectedAt', name: '발주일시', formatter: timeFormat,width: 150},
            {key: 'paidAt', name: '결제일시', formatter: timeFormat,width: 150},
            {key: 'totalQuantity', name: '총 수량',width: 80},
            {key: 'orderState', name: '오더 상태',width: 150},
            {key: 'orderStateDescription', name: '오더 상태 설명',width: 200},
            // {key: 'vendor.vendorId', name: '벤더 ID',width: 90},
            // {key: 'vendor.vendorName', name: '벤더',width: 100},
            // {key: 'salesChannel.salesChannelId', name: '판매채널 ID',width: 100},
            // {key: 'salesChannel.salesChannelCode', name: '판매채널 코드',width: 100},
            {key: 'salesChannel.salesChannelName', name: '판매채널',width: 100},
            // {key: 'salesChannel.baseUrl', name: '판매채널 URL',width: 100},
            {key: 'orderProduct.productId', name: '벤더아이템 ID (상품 ID)',width: 200},
            {key: 'orderProduct.productName', name: '벤더아이템 이름 (상품명)',width: 300},
            {key: 'orderProduct.productDesc', name: '벤더아이템 설명 (상풍 설명)',width: 200},
            {key: 'orderProduct.quantity', name: '상품 수량',width: 80},
            {key: 'orderProduct.productPrice.paymentMethod', name: '결제방법',width: 100},
            {key: 'orderProduct.productPrice.originalPrice', name: '판매원가',width: 100},
            {key: 'orderProduct.productPrice.salesPrice', name: '실판매가',width: 100},
            {key: 'orderProduct.productPrice.paymentAmount', name: '결제금액',width: 100},
            {key: 'orderProduct.applyType', name: '주문, 교환, 취소(배송전), 반품(배송후)',width: 300},
            {key: 'orderAddress.originalAddress.address1', name: '고객 원본 주소1',width: 200},
            {key: 'orderAddress.originalAddress.address2', name: '고객 원본 주소2',width: 200},
            {
              key: 'orderAddress.originalAddress.fullAddress',
              name: '고객 원본 전체주소',width: 250
            },
            {
              key: 'orderAddress.originalAddress.postalCode',
              name: '고객 원본 우편번호',width: 200
            },
            // {
            //   key: 'orderAddress.refinedAddress.roadAddress',
            //   name: '정제된 도로명 주소',width: 200
            // },
            // {
            //   key: 'orderAddress.refinedAddress.jibunAddress',
            //   name: '정제된 지번 주소',width: 200
            // },
            // {key: 'orderAddress.refinedAddress.roadName', name: '정제된 도로명',width: 200},
            // {
            //   key: 'orderAddress.refinedAddress.postalCode5',
            //   name: '정제된 5자리 우편번호',width: 200
            // },
            // {
            //   key: 'orderAddress.refinedAddress.postalCode6',
            //   name: '정제된 6자리 우편번호',width: 200
            // },
            // {
            //   key: 'orderAddress.refinedAddress.buildingMainNumber',
            //   name: '정제된 건물 주번지',width: 200
            // },
            // {
            //   key: 'orderAddress.refinedAddress.buildingSubNumber',
            //   name: '정제된 건물 부번지',width: 200
            // },
            // {
            //   key: 'orderAddress.refinedAddress.buildingName',
            //   name: '정제된 건물 이름',width: 200
            // },
            // {
            //   key: 'orderAddress.refinedAddress.buildingDong',
            //   name: '정제된 건물 동',width: 200
            // },
            // {key: 'orderAddress.refinedAddress.buildingHo', name: '정제된 건물 호',width: 200},
            // {key: 'orderAddress.refinedAddress.longitude', name: '경도',width: 80},
            // {key: 'orderAddress.refinedAddress.latitude', name: '위도',width: 80},
            {key: 'orderAddress.recipient.name', name: '수취인 이름',width: 130},
            {key: 'orderAddress.recipient.phoneNumber1', name: '수취인 전화번호1',width: 150},
            {key: 'orderAddress.recipient.phoneNumber2', name: '수취인 전화번호2',width: 150},
            {key: 'orderAddress.orderer.name', name: '주문자 이름',width: 130},
            {key: 'orderAddress.orderer.phoneNumber1', name: '주문자 전화번호1',width: 150},
            {key: 'orderAddress.orderer.phoneNumber2', name: '주문자 전화번호2',width: 150},
            {
              key: 'orderAddress.deliveryRequest.deliveryRequest',
              name: '배송요청사항',width: 300
            },
          ]}
            row={this.state.gridData}
            />
          </Form>
          <Form>
            <Workbook filename="주문내역.xlsx" element={<button className="btn btn-lg btn-primary">excel</button>}>
              <Workbook.Sheet data={this.state.parsedGridData} name="order data">
                <Workbook.Column label="주문아이디" value="orderId"/>
                <Workbook.Column label="주문일시" value="orderedAt" />
                <Workbook.Column label="발주일시" value="collectedAt"/>
                <Workbook.Column label="결제일시" value="paidAt"/>
                <Workbook.Column label="총 수량" value="totalQuantity"/>
                <Workbook.Column label="오더 상태" value="orderState"/>
                <Workbook.Column label="오더 상태 설명" value="orderStateDescription"/>
                {/*<Workbook.Column label="벤더 ID" value="vendorvendorId"/>*/}
                {/*<Workbook.Column label="벤더" value="vendorvendorName" />*/}
                {/*<Workbook.Column label="판매채널 ID" value="salesChannelsalesChannelId"/>*/}
                {/*<Workbook.Column label="판매채널 코드" value="salesChannelsalesChannelCode"/>*/}
                <Workbook.Column label="판매채널" value="salesChannelsalesChannelName"/>
                {/*<Workbook.Column label="판매채널 URL" value="salesChannelbaseUrl"/>*/}
                <Workbook.Column label="오벤더아이템 ID (상품 ID)" value="orderProductproductId"/>
                <Workbook.Column label="벤더아이템 이름 (상품명)" value="orderProductproductName"/>
                <Workbook.Column label="벤더아이템 설명 (상풍 설명)" value="orderProductproductDesc" />
                <Workbook.Column label="상품 수량" value="orderProductquantity"/>
                <Workbook.Column label="결제방법" value="orderProductproductPricepaymentMethod"/>
                <Workbook.Column label="판매원가" value="orderProductproductPriceoriginalPrice"/>
                <Workbook.Column label="실판매가" value="orderProductproductPricesalesPrice"/>
                <Workbook.Column label="결제금액" value="orderProductproductPricepaymentAmount"/>
                <Workbook.Column label="주문, 교환, 취소(배송전), 반품(배송후)" value="orderProductapplyType"/>
                <Workbook.Column label="고객 원본 주소1" value="orderAddressoriginalAddressaddress1"/>
                <Workbook.Column label="고객 원본 주소2" value="orderAddressoriginalAddressaddress2"/>
                <Workbook.Column label="고객 원본 전체주소" value="orderAddressoriginalAddressfullAddress"/>
                <Workbook.Column label="고객 원본 우편번호" value="orderAddressoriginalAddresspostalCode"/>
                {/*<Workbook.Column label="정제된 도로명 주소" value="orderAddressrefinedAddressroadAddress"/>*/}
                {/*<Workbook.Column label="정제된 지번 주소" value="orderAddressrefinedAddressjibunAddress"/>*/}
                {/*<Workbook.Column label="정제된 도로명" value="orderAddressrefinedAddressroadName"/>*/}
                {/*<Workbook.Column label="정제된 5자리 우편번호" value="orderAddressrefinedAddresspostalCode5"/>*/}
                {/*<Workbook.Column label="정제된 6자리 우편번호" value="orderAddressrefinedAddresspostalCode6"/>*/}

                {/*<Workbook.Column label="정제된 건물 주번지" value="orderAddressrefinedAddressbuildingMainNumber"/>*/}
                {/*<Workbook.Column label="정제된 건물 부번지" value="orderAddressrefinedAddressbuildingSubNumber" />*/}
                {/*<Workbook.Column label="정제된 건물 이름" value="orderAddressrefinedAddressbuildingName"/>*/}
                {/*<Workbook.Column label="정제된 건물 동" value="orderAddressrefinedAddressbuildingDong"/>*/}

                {/*<Workbook.Column label="정제된 건물 호" value="orderAddressrefinedAddressbuildingHo"/>*/}
                {/*<Workbook.Column label="경도" value="orderAddressrefinedAddresslongitude" />*/}
                {/*<Workbook.Column label="위도" value="orderAddressrefinedAddresslatitude"/>*/}
                <Workbook.Column label="수취인 이름" value="orderAddressrecipientname"/>

                <Workbook.Column label="수취인 전화번호1" value="orderAddressrecipientphoneNumber1"/>
                <Workbook.Column label="수취인 전화번호2" value="orderAddressrecipient.honeNumber2" />
                <Workbook.Column label="주문자 이름" value="orderAddressorderername"/>
                <Workbook.Column label="주문자 전화번호1" value="orderAddressordererphoneNumber1"/>
                <Workbook.Column label="주문자 전화번호2" value="orderAddressordererphoneNumber2"/>
                <Workbook.Column label="배송요청사항" value="orderAddressdeliveryRequestdeliveryRequest"/>
              </Workbook.Sheet>
            </Workbook>
          </Form>
        </Mcard>

      </Aux>
    );
  }
}

export default ExcelUpload;
