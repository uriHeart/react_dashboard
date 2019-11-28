import React from 'react';

const SignUp = React.lazy(() => import('./views/authentication/SignUp'));
const SignIn = React.lazy(() => import('./views/authentication/SignIn'));
const home = React.lazy(() => import('./views/home'));
const RegistrationConfirm = React.lazy(() => import('./views/authentication/RegistrationConfirm'));
const AdditionalInfo = React.lazy(() => import('./views/authentication/AdditionalInfo'));
const ResetPassword = React.lazy(() => import('./views/authentication/ResetPassword'));
const ResetPasswordConfirm = React.lazy(() => import('./views/authentication/ResetPassword/ResetPasswordConfirm'));

const route = [
    { path: '/auth/signup', exact: true, name: 'Signup', component: SignUp},
    { path: '/auth/signin/:redirect', exact: true, name: 'Signin', component: SignIn},
    { path: '/auth/signin', exact: true, name: 'Signin', component: SignIn},
    { path: '/', exact: true, name: 'Index', component: home},
    { path: '/auth/confirm/:uuid', exact: true, name: 'RegistrationConfirm', component: RegistrationConfirm },
    { path: '/auth/reset-password', exact: true, name: 'ResetPassword', component: ResetPassword },
    { path: '/auth/resetPasswordConfirm/:token', exact: true, name: 'AdditionalInfo', component: ResetPasswordConfirm },
    { path: '/auth/additional-info', exact: true, name: 'AdditionalInfo', component: AdditionalInfo, isNotPublic: true },
];

export default route;
