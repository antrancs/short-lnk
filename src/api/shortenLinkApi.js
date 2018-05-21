import axios from 'axios';
import moment from 'moment';

// Handle CORS in the Impraise-shorty server through cors-anywhere
// https://github.com/Rob--W/cors-anywhere
const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com';
export const BASE_URL = 'https://shorty-lnk.herokuapp.com';

class ShortenLinkApi {
    static shortenLink(url) {
        return axios.post(`${CORS_ANYWHERE}/${BASE_URL}/api/links`, {
            url
        })
        .then((res) => {
            console.log(res.data);
            return res.data.shortcode;
        })
        .catch((err) => {
            console.log(err);
        });
    }

    static getStat(shortcode) {
        return axios.get(`${CORS_ANYWHERE}/${BASE_URL}/api/links/${shortcode}/stats`)
            .then((res) => {
                const { visitCount, lastVisit } = res.data;
                return {
                    visitCount,
                    // new links don't have lastSeenDate property
                    lastVisit: lastVisit ? moment(lastVisit) : undefined
                };
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export default ShortenLinkApi;

