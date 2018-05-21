import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import configureStore from './store/configureStore';
import { loadLinks } from './actions/links';
import { setLoadingStatus } from './actions/loadingStatus';
import registerServiceWorker from './registerServiceWorker';
import 'normalize.css/normalize.css';
import './styles/styles.css';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
);

store.dispatch(loadLinks())
    .then(() => {
        // set loading to false when done with loading the links
        store.dispatch(setLoadingStatus(false));
    });

ReactDOM.render(jsx, document.getElementById('root'));

registerServiceWorker();
