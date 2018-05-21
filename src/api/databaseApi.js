import shortenLinkApi from './shortenLinkApi';

const LINKS = 'links';
class DatabaseApi {
    static saveLink(links, newLink) {
        // return a new Promise to simulate async call
        return new Promise((resolve, reject) => {
            try {
                const json = JSON.stringify([
                    ...links,
                    newLink
                ]);
                localStorage.setItem(LINKS, json);
                resolve(newLink);
            } catch (ex) {
                reject('Cannot save the link');
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
            const promises = links.map((link) => {
                return shortenLinkApi.getStat(link.shortcode)
                        .then((stat) => {
                            return {
                                ...link,
                                ...stat
                            };
                        });
            });
            return Promise.all(promises)
                    .then((results) => {
                        return results;
                    });
        } catch (err) {
            Promise.reject();
        }
    }

    static removeAllLinks() {
        return new Promise((resolve, reject) => {
            try {
                localStorage.removeItem(LINKS);
                resolve();
            } catch (err) {
                reject('Cannot remove links');
            }
        });
    }
}

export default DatabaseApi;
