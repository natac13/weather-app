import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import Loadable from 'react-loadable';

import Navbar from '../common/Navbar';
import Loading from '../common/Loading';
import WeatherView from '../_weatherView';

const AsyncForecast = Loadable({
  loader: () => import('../_forecast'),
  loading: Loading,
});
const AsyncCurrentWeather = Loadable({
  loader: () => import('../_currentWeather'),
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

const App = () => {
  const [hasGeolocation, setHasGeolocation] = useState(true);
  const [position, setPosition] = useState({});
  // GeoLocation Setting
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      });
      setHasGeolocation(true);
    } else {
      setHasGeolocation(false);
    }
  }, [hasGeolocation]);

  return (
    <Router>
      <section className="app">
        <Navbar />
        <WeatherView>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <AsyncCurrentWeather position={position} {...props} />
              )}
            />
            <Route
              exact
              path="/forecast"
              render={(props) => (
                <AsyncForecast position={position} {...props} />
              )}
            />
            <Route component={NoMatch} />
          </Switch>
        </WeatherView>
      </section>
    </Router>
  );
};

export default hot(App);
