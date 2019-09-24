import { createStore } from 'redux';
import reducers from './reducers';

const storeFactory = () => {
   const store = createStore(reducers, {});
   return store;
};

export default storeFactory;
