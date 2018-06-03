import * as types from './../actions/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case types.ADD_LINK:
      return [...state, action.link];
    case types.SET_LINKS:
      return action.links;
    case types.REMOVE_LINKS:
      return [];
    default:
      return state;
  }
};
