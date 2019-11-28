import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));

const ExcelUpload = React.lazy(() => import('./views/excel/excelUp'));
const Order = React.lazy(() => import('./views/order'));
const Dashboard = React.lazy(() => import('./views/dashboard'));
const AllDashboard = React.lazy(() => import('./views/allDashboard'));
const ExcelDetailGrid = React.lazy(() => import('./views/excel/ExcelDetailGrid'));

const routes = [
    { path: '/dashboard/default', exact: true, name: 'Default', component: DashboardDefault, isPublic: false },
    { path: '/excel-upload', exact: true, name: 'excel upload', component: ExcelUpload, isPublic: false },
    { path: '/order', exact: true, name: 'order', component: Order, isPublic: false },
    { path: '/excel/detail:indexId', exact: true, name: 'excel detail', component: ExcelDetailGrid },
    { path: '/dashboard', exact: true, name: 'dashboard', component: Dashboard },
    { path: '/all-dashboard', exact: true, name: 'all-dashboard', component: AllDashboard }
];

export default routes;
