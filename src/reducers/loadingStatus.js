import * as types from './../actions/actionTypes';

// Initial state for loading is true. Set to false when loading is done
export default (state = true, action) => {
  switch (action.type) {
    case types.SET_LOADING_STATE:
      return action.state;
    default:
      return state;
  }
};
