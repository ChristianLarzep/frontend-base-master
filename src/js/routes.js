import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import DemoPage from './pages/DemoPage';
import App from './pages/App';
import Apollo from './pages/Apollo';
import Login from './pages/Login';
import Employees from './pages/Employees';

export default params => (
  <ConnectedRouter history={params.history}>
    <Switch>
      <Route exact path="/app" component={App} />
      <Route path="/apollo" component={Apollo} />
      <Route path="/login" component={Login} />
      <Route path="/employees" component={Employees} />
      <Route path="/" component={DemoPage} />
    </Switch>
  </ConnectedRouter>
);
