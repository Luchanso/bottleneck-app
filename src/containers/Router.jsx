import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Timers from './Timers';

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Timers} />
    </Switch>
  </Router>
);
