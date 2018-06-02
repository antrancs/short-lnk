import * as types from './actionTypes';

export const sortByCreationDate = () => ({
  type: types.SORT_BY_CREATION_DATE
});

export const sortByLastVisitDate = () => ({
  type: types.SORT_BY_LAST_VISIT_DATE
});

export const sortByVisits = () => ({
  type: types.SORT_BY_VISITS
});
