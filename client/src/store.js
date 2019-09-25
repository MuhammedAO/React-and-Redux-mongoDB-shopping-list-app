import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import rootreducer from './reducers/index'


const initialState = {}

const middleware = [thunk];

const store = createStore (rootreducer,initialState,compose(
applyMiddleware(...middleware)
));

export default store;