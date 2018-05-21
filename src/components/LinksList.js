import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import LinksListControl from './LinksListControl';
import Link from './Link';
import Loader from './Loader';
import sortLinks from './../selectors/links';

const LinksList = (props) => (
    <div>
        {props.isLoading ? <Loader /> : (
            <div>
                <LinksListControl />

                {props.links.length === 0 ?
                    <p className="links-list-empty-message">No links</p> : 
                    (
                        <div className="table">
                            <div className="table__row table__header">
                                <div className="table__cell link-group">Links</div>
                                <div className="table__cell link-visits">Visits</div>
                                <div className="table__cell link-last-visit">Last visit</div>
                            </div> 

                            <ReactCSSTransitionGroup
                                transitionName="fade"
                                transitionEnterTimeout={1000}
                                transitionLeaveTimeout={500}
                            >
                                {
                                    props.links.map((link) => (
                                        <Link
                                            key={link.shortcode}
                                            {...link}
                                        />
                                    ))
                                }
                            </ReactCSSTransitionGroup>
                        </div>
                    )
                }
            </div>
        )}
    </div>
);

const mapStateToProps = (state) => ({
    links: sortLinks(state.links, state.sortCriteria),
    isLoading: state.loadingStatus
});

export default connect(mapStateToProps)(LinksList);
