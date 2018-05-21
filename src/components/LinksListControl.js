import React from 'react';
import { connect } from 'react-redux';

import { startRemoveLinks } from './../actions/links';
import { sortByCreationDate, sortByLastVisitDate, sortByVisits } from './../actions/sortCriteria';

class LinksListControl extends React.Component {
    onSortSelectChange = (evt) => {
        switch (evt.target.value) {
            case 'creation-date':
                return this.props.sortByCreationDate();
            case 'last-visit':
                return this.props.sortByLastVisitDate();
            case 'visits':
                return this.props.sortByVisits();
        }
    };

    render() {
        return (
            <div className="links-list-control">
                <div className="links-list-control__header">
                    <div className="links-list-control__header__title">Previously shortened by you</div>
                    <button
                        onClick={() => {
                            this.props.startRemoveLinks()
                        }}
                        className="button--link"
                    >
                        Clear history
                    </button>
                </div>

                <select
                    className="select"
                    value={this.props.sortBy}
                    onChange={this.onSortSelectChange}
                >
                    <option value="creation-date">Creation Date</option>
                    <option value="visits">Visits</option>
                    <option value="last-visit">Last visit</option>
                </select>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startRemoveLinks: () => dispatch(startRemoveLinks()),
    sortByCreationDate: () => dispatch(sortByCreationDate()),
    sortByLastVisitDate: () => dispatch(sortByLastVisitDate()),
    sortByVisits: () => dispatch(sortByVisits())
});

const mapStateToProps = (state) => ({
    sortBy: state.sortCriteria
});

export default connect(mapStateToProps, mapDispatchToProps)(LinksListControl);
