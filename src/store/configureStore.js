import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import linksReducer from './../reducers/links';
import loadingStatusReducer from './../reducers/loadingStatus';
import sortCriteriaReducer from './../reducers/sortCriteria';

export default () => {
    const store = createStore(
        combineReducers({
            links: linksReducer,
            loadingStatus: loadingStatusReducer,
            sortCriteria: sortCriteriaReducer
        }),
        applyMiddleware(thunk)
    );
    return store;
};