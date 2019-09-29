export default {
    items: [
        {
            id: 'navigation',
            title: 'sign in & sign up',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'auth',
                    title: 'Authentication',
                    type: 'collapse',
                    icon: 'feather icon-lock',
                    // badge: {
                    //     title: 'New',
                    //     type: 'label-danger'
                    // },
                    children: [
                        {
                            id: 'signup-1',
                            title: 'Sign up',
                            type: 'item',
                            url: '/auth/signup-1',
                            target: true,
                            breadcrumbs: false
                        },
                        {
                            id: 'signin-1',
                            title: 'Sign in',
                            type: 'item',
                            url: '/auth/signin-1',
                            target: true,
                            breadcrumbs: false
                        }
                    ]
                },
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
