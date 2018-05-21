import React from 'react';

import Header from './Header';
import AddLink from './AddLink';
import LinksList from './LinksList';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <AddLink />
                    <LinksList />
                </div>
            </div>

        );
    }
}

export default App;
