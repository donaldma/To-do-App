import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import NavBar from './components/nav';

import reducers from './reducers';
import AllTasks from './components/tasks_all';
import UserTasks from './components/tasks_user';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, ReduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>  
    <BrowserRouter>
      <div>
        <NavBar />
        <Switch>
          <Route path="/tasks" component={AllTasks} />
          <Route path="/" component={UserTasks} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('react-root'));