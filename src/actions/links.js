import * as types from './actionTypes';
import shortenLinkApi from './../api/shortenLinkApi';
import databaseApi from './../api/databaseApi';

export const addLink = link => ({
  type: types.ADD_LINK,
  link
});

export const shortenLink = url => (dispatch, getState) =>
  // call the shortenLink API & get the shortcode
  shortenLinkApi
    .shortenLink(url)
    .then(shortcode => {
      const link = {
        originalUrl: url,
        shortcode,
        visitCount: 0,
        lastVisit: undefined,
        createdAt: Date.now()
      };

      // save the new link to the DB
      return databaseApi.saveLink(getState().links, link);
    })
    .then(link => {
      // after save link to DB
      dispatch(addLink(link));
    });

export const setLinks = links => ({
  type: types.SET_LINKS,
  links
});

export const loadLinks = () => dispatch =>
  databaseApi.getAllLinks().then(links => {
    dispatch(setLinks(links));
  });

// remove links from the store
export const removeLinks = () => ({
  type: types.REMOVE_LINKS
});

// remove all links from localStorage
export const startRemoveLinks = () => dispatch =>
  databaseApi.removeAllLinks().then(() => {
    dispatch(removeLinks());
  });
