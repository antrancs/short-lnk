import * as types from './actionTypes';

const setLoadingStatus = state => ({
  type: types.SET_LOADING_STATE,
  state
});

export default setLoadingStatus;
