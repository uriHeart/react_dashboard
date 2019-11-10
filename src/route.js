import React from 'react';

const SignUp = React.lazy(() => import('./views/authentication/SignUp'));
const SignIn = React.lazy(() => import('./views/authentication/SignIn'));
const home = React.lazy(() => import('./views/home'));
const RegistrationConfirm = React.lazy(() => import('./views/authentication/RegistrationConfirm'));
const AdditionalInfo = React.lazy(() => import('./views/authentication/AdditionalInfo'));

const route = [
    { path: '/auth/signup', exact: true, name: 'Signup', component: SignUp },
    { path: '/auth/signin/:redirect', exact: true, name: 'Signin', component: SignIn },
    { path: '/auth/signin', exact: true, name: 'Signin', component: SignIn },
    { path: '/home', exact: true, name: 'Signin', component: home },
    { path: '/auth/confirm/:uuid', exact: true, name: 'RegistrationConfirm', component: RegistrationConfirm },
    { path: '/auth/additional-info', exact: true, name: 'AdditionalInfo', component: AdditionalInfo }
];

export default route;
