import { createStore } from 'redux';
import reducers from './reducers/users.js';

const store = createStore(reducers);

export default store;