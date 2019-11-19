export default {
    items: [
        {
            id: 'dashboard',
            title: '대시보드',
            type: 'group',
            icon: 'icon-pie-chart',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard',
                    icon: 'feather icon-bar-chart',
                }
            ]
        },
        {
            id: 'Order',
            title: '주문',
            type: 'group',
            icon: 'icon-group',
            children: [
                {
                    id: 'order',
                    title: '주문 조회',
                    type: 'item',
                    url: '/order',
                    icon: 'feather icon-alert-octagon'
                },
                {
                    id: 'excelUp',
                    title: '수동 주문 업로드',
                    type: 'item',
                    url: '/excel-upload',
                    icon: 'feather icon-upload'
                }
            ]
        }
    ]
}
