import React, { useState, useEffect } from 'react';
import axios from 'axios';
import isEmpty from 'is-empty';
import differenceInMinutes from 'date-fns/fp/differenceInMinutes';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import DayCard from './components/dayCard';

import secret from '../secret';
import clouds from '../../public/static/clouds.jpg';
import style from './style.scss';

const { localStorage } = window;

const endPoint = 'https://api.openweathermap.org/data/2.5/forecast/daily?';

const WeatherView = (props) => {
  const [weatherData, setWeatherData] = useState({});
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

  // Fetching Weather Data based on GeoLocation.
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('weatherData'));
    const timeOfStorage = new Date(localData.time);
    const now = new Date();
    const minutesBetweenStorageAndNow = differenceInMinutes(timeOfStorage, now);

    // when there is localData and it is within 10mins of last request, set to weatherData
    if (!isEmpty(localData) /* && minutesBetweenStorageAndNow < 10 */) {
      console.log('use stored data');
      setWeatherData(localData.weatherData);
    } else if (!isEmpty(position)) {
      const { latitude, longitude } = position;
      axios
        .get(
          `${endPoint}cnt=14&lat=${latitude}&lon=${longitude}&APPID=${
            secret.weatherApi
          }`
        )
        .then(({ data }) => {
          // store weather data in localStorage for less API requests
          // Store time to compare when fetched.
          const toStoreData = {
            weatherData: data,
            time: new Date(),
          };
          localStorage.setItem('weatherData', JSON.stringify(toStoreData));
          setWeatherData(data);
        })
        .catch((err) => {
          console.error(err);
        });
      console.log('new Data form axios');
    }
  }, [position]);

  console.log(position);
  console.log(weatherData);

  const { city = {}, list = [] } = weatherData || {};
  const { country, id, name, population } = city;

  const weatherCards = list.map((day) => {
    return <DayCard data={day} key={day.dt} />;
  });

  return (
    <main className={style.page}>
      <section className={style.wrapper}>
        {isEmpty(weatherData) ? (
          <CircularProgress />
        ) : (
          <React.Fragment>
            <section className={style.overview}>
              <figure className={style.backdrop}>
                <img src={clouds} alt="description" />
              </figure>
              <div className={style.currentWeather}>
                <Typography variant="h2" component="h1">
                  12C
                </Typography>
                <Typography variant="subtitle1" align="center">
                  Overcast
                </Typography>
              </div>
            </section>

            <section className={style.forecast}>{weatherCards}</section>
          </React.Fragment>
        )}
      </section>
    </main>
  );
};

export default WeatherView;
