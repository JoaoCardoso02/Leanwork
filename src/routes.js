import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/Home/index.jsx';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
)

export default Routes;