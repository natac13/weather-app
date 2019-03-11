import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import Loadable from 'react-loadable';

import Navbar from '../common/Navbar';
import Loading from '../common/Loading';

const AsyncLanding = Loadable({
  loader: () => import('../_landing'),
  loading: Loading,
});
const AsyncWeatherView = Loadable({
  loader: () => import('../_weatherView'),
  loading: Loading,
});

function NoMatch({ location }) {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

const App = () => (
  <Router>
    <section className="app">
      <Navbar />
      <Switch>
        <Route exact path="/" component={AsyncWeatherView} />
        <Route component={NoMatch} />
      </Switch>
    </section>
  </Router>
);

export default hot(App);
