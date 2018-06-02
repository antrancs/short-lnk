import shortenLinkApi from './shortenLinkApi';

const LINKS = 'links';
class DatabaseApi {
  static saveLink(links, newLink) {
    // return a new Promise to simulate async call
    return new Promise((resolve, reject) => {
      try {
        const json = JSON.stringify([...links, newLink]);
        localStorage.setItem(LINKS, json);
        resolve(newLink);
      } catch (ex) {
        reject(new Error('Cannot save the link'));
      }
    });
  }

  static getAllLinks() {
    try {
      const json = localStorage.getItem(LINKS);

      // set to an empty array when localStorage is empty
      const links = JSON.parse(json) || [];

      // for each item in the links array, get the latest stat
      // from the ShortLink server (Visits & last visit date)
      const promises = links.map(link =>
        shortenLinkApi.getStat(link.shortcode).then(stat => ({
          ...link,
          ...stat
        }))
      );
      return Promise.all(promises).then(results => results);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static removeAllLinks() {
    return new Promise((resolve, reject) => {
      try {
        localStorage.removeItem(LINKS);
        resolve();
      } catch (err) {
        reject(new Error('Cannot remove links'));
      }
    });
  }
}

export default DatabaseApi;
