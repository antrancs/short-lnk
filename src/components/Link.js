import React from 'react';
import Clipboard from 'clipboard';
import ReactTooltip from 'react-tooltip'

import { BASE_URL } from './../api/shortenLinkApi';

class Link extends React.Component {
    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copyUrl);

        this.clipboard.on('success', () => {
            alert('Link copied');
        });
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }

    render() {
        const { originalUrl, shortcode, visitCount, lastVisit, isNew } = this.props;

        let rowClassName = "table__row";
        rowClassName += isNew ? " link--new" : "";

        const href = originalUrl.startsWith('http') ? originalUrl : `//${originalUrl}`;

        return (
            <div className={rowClassName}>
                <div className="table__cell link-group">
                    <div
                        data-clipboard-text={`${BASE_URL}/${shortcode}`}
                        ref="copyUrl"
                        data-tip="Click to copy this link"
                        className="link-group__short tooltip-toggle"
                    >
                        {`${BASE_URL}/`}
                        <span className="link-group__short--shortcode">{`${shortcode}`}</span>

                        <ReactTooltip
                            type="success"
                        />
                    </div>

                    <div className="link-group__original">
                        <a href={href}>{originalUrl}</a>
                    </div>
                </div>
                <div className="table__cell link-visits">{visitCount}</div>
                <div className="table__cell link-last-visit">{lastVisit ? lastVisit.fromNow() : "Never"}</div>
            </div>
        );
    }
}

export default Link;
