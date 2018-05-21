import React from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import { shortenLink } from './../actions/links';

class AddLink extends React.Component {
    state = {
        loading: false,
        url: '',
        error: ''
    };

    onUrlChange = (evt) => {
        const url = evt.target.value;
        this.setState(() => ({ url }));
    };

    onSubmit = (evt) => {
        evt.preventDefault();

        const url = this.state.url;

        const error = validator.isURL(url) ? '' : 'Invalid URL';
        
        this.setState(() => ({ error }));

        if (!error) {
            // set loading to true when calling shortenLink API
            this.setState(() => ({ loading: true }));
            this.props.shortenLink(url)
                .then(() => {
                    this.setState(() => ({ url: ''}))
                })
                .catch((err) => {
                    this.setState(() => ({ error: 'Cannot shorten the link' }));
                })
                .finally(() => {
                    // Set loading to false after all
                    this.setState(() => ({ loading: false }));
                });
        }
    };

    render() {
        return (
            <div className="add-link-wrapper">
                {this.state.error && <p className="add-link-error">{this.state.error}</p>}
                <form 
                    className="add-link"
                    onSubmit={this.onSubmit}
                >
                    <input 
                        className="add-link__input"
                        name="url"
                        type="text" 
                        placeholder="Paste the link you want to shorten here"
                        onChange={this.onUrlChange}
                        value={this.state.url}
                    />
                    <button
                        disabled={this.state.url.length === 0 || this.state.loading}
                        className="button"
                    >
                        {this.state.loading ? 'Shortening...' : 'Shorten this link'}
                    </button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    shortenLink: (url) => dispatch(shortenLink(url))
});

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddLink);
