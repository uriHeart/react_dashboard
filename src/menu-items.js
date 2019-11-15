export default {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard',
                    icon: 'feather icon-home',
                }
            ]
        },
        {
            id: 'ui-forms',
            title: 'Excel Upload & Search',
            type: 'group',
            icon: 'icon-group',
            children: [
                {
                    id: 'excelUp',
                    title: '엑셀 업로드',
                    type: 'item',
                    url: '/excel-upload',
                    icon: 'feather icon-file-text'
                }, {
                    id: 'order',
                    title: '주문 조회',
                    type: 'item',
                    url: '/order',
                    icon: 'feather icon-file-text'
                }
            ]
        }
    ]
}
