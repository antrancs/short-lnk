import React from 'react';

import Header from './Header';
import AddLink from './AddLink';
import LinksList from './LinksList';

const App = () => (
  <div>
    <Header />
    <div className="container">
      <AddLink />
      <LinksList />
    </div>
  </div>
);

export default App;
