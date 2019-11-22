import devConfig from './config/dev-config';
import prdConfig from './config/prd-config';

//export default (process.env.NODE_ENV === 'production') ? prdConfig : devConfig;
export default (process.env.NODE_ENV === 'production') ?  devConfig: prdConfig;
