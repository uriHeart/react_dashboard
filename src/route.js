import React from 'react';

const SignUp1 = React.lazy(() => import('./Demo/Authentication/SignUp/SignUp1'));
const Signin1 = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn1'));
const conversionTemplate = React.lazy(() => import('./App/components/admin/conversion/ConversionTemplate'));
const home = React.lazy(() => import('./views/home'));
//const conversionTemplate = React.lazy(() => import('.App/components/admin/conversionTemplate'));

const route = [
    { path: '/auth/signup-1', exact: true, name: 'Signup 1', component: SignUp1 },
    { path: '/auth/signin-1', exact: true, name: 'Signin 1', component: Signin1 },
    { path: '/home', exact: true, name: 'Signin 1', component: home },
    { path: '/admin/data/conversion-template', exact: true, name: 'Conversion Template', component: conversionTemplate }
];

export default route;