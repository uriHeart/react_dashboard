import React, {Component} from 'react';
import moment from 'moment';
import DataGrid from "../../component/dataGrid";

class Main extends Component {

  render() {
    const timeFormat = ({value}) => {
      return <span>{`${moment(value).format('YYYY-MM-DD HH:mm:ss')}`}</span>
    };
    return (
      <DataGrid style={{width:800}} url={'/orders'} param={{}} mapper={[
        {key: 'vendor.vendorName', name: 'Vendor'},
        {key: 'orderProduct.productName', name: '상품명'},
        {key: 'orderProduct.productPrice.salesPrice', name: '가격'},
        {key: 'collectedAt', name: '수집 시간', formatter: timeFormat},
        {key: 'orderedAt', name: '주문 시간', formatter: timeFormat}
      ]}/>
    )
  }
}

export default Main;


