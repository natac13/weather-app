import React, { useState, useEffect } from 'react';
import axios from 'axios';
import isEmpty from 'is-empty';
import differenceInMinutes from 'date-fns/fp/differenceInMinutes';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Forecast from '../_forecast';
import CurrentWeather from '../_currentWeather';

import secret from '../secret';
import style from './style.scss';

const endPoint = 'https://api.openweathermap.org/data/2.5/forecast/daily?';

const WeatherView = (props) => {
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

  console.log(position);

  return (
    <main className={style.page}>
      <section className={style.wrapper}>
        {isEmpty(position) ? (
          <CircularProgress />
        ) : (
          <React.Fragment>
            <CurrentWeather position={position} />

            {/* <Forecast className={style.forecast} position={position} /> */}
          </React.Fragment>
        )}
      </section>
    </main>
  );
};

export default WeatherView;
