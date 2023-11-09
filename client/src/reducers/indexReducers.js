import { combineReducers } from 'redux';

import reducersPosts from './reducersPosts.js';
import authReducers from './authReducers.js';

export default combineReducers({ reducersPosts, authReducers });