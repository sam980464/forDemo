import { Events } from '@macmillan-learning/savi-events';
import { isProduction } from '@macmillan-learning/savi-responsive-component';
import * as actions from './actions';




const ReactGA = require('react-ga');
const gaId = (isProduction() ? 'UA-61805489-1' : 'UA-61805489-3');
const gaDebug = !isProduction();

ReactGA.initialize(gaId, { debug: gaDebug, gaOptions: { cookieDomain: 'none' } });
export default ReactGA;
