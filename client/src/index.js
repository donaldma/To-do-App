import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';

// import reducers from './reducers';
import App from './components/App';

// const createStoreWithMiddleware = applyMiddleware(ReduxPromise, ReduxThunk)(createStore);

ReactDOM.render(
  // <Provider store={createStoreWithMiddleware(reducers)}>  
    // <div>
      <App />
    // </div>
  // </Provider>
  , document.getElementById('react-root'));