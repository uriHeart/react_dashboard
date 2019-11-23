import devConfig from './config/dev-config';
import prdConfig from './config/prd-config';

console.log(process.env.NODE_ENV)
export default (process.env.NODE_ENV === 'production') ? prdConfig : devConfig;