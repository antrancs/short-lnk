import * as types from './../actions/actionTypes';

// default sorting is by creation date
export default (state = 'creation-date', action) => {
    switch (action.type) {
        case types.SORT_BY_CREATION_DATE:
            return 'creation-date';
        case types.SORT_BY_VISITS:
            return 'visits';
        case types.SORT_BY_LAST_VISIT_DATE:
            return 'last-visit';
        default:
            return state;
    }
};