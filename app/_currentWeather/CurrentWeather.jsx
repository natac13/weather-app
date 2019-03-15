import React, { useState, useEffect } from 'react';
import axios from 'axios';
import isEmpty from 'is-empty';
import differenceInMinutes from 'date-fns/fp/differenceInMinutes';
import format from 'date-fns/fp/format';
import { upperFirst } from 'lodash';
/* Components */
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
/* App Files */
import secret from '../secret';
import { currentWeatherEndPoint } from '../common/constants';
import clouds from '../../public/static/clouds.jpg';
import {
  celsiusToFahrenheit,
  celsiusToKelvin,
  kelvinToCelsius,
  kelvinTofahrenheit,
  fahrenheitToCelsius,
  fahrenheitToKelvin,
  tempGenerator,
} from '../common/utils';
/* Style */
import style from './style.scss';
/* Main Component */
function CurrentWeather(props) {
  const { position } = props;
  const [weatherData, setWeatherData] = useState({});
  const CURRENT_WEATHER = 'currentWeather';

  // Fetching Weather Data based on GeoLocation.
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem(CURRENT_WEATHER));
    // const timeOfStorage = new Date(localData.time); // need to fixe since localData may not be set.
    const now = new Date();
    // const minutesBetweenStorageAndNow = differenceInMinutes(timeOfStorage, now);
    // when there is localData and it is within x-mins of last request, set to weatherData
    if (!isEmpty(localData) /* && minutesBetweenStorageAndNow < 60 */) {
      setWeatherData(localData.weatherData);
    } else if (!isEmpty(position)) {
      const { latitude, longitude } = position;
      axios
        .get(
          `${currentWeatherEndPoint}lat=${latitude}&lon=${longitude}&APPID=${
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
          localStorage.setItem(CURRENT_WEATHER, JSON.stringify(toStoreData));
          setWeatherData(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [position]);

  const {
    name,
    dt = 0, // time of weather
    weather = [{}],
    main = {},
    wind = {},
    sys = {},
    id, // city id
  } = weatherData;

  const {
    icon: iconID,
    description: weatherDescription,
    main: shortDescription,
  } = weather[0];
  const { temp, pressure, humidity, temp_min, temp_max } = main;
  const { speed: windSpeed, deg: windDeg } = wind;
  const { sunrise = 0, sunset = 0, country } = sys;
  const formatToTime = format('h:mm a');
  const tempInCelsius = kelvinToCelsius(temp);
  const formattedDescription = upperFirst(weatherDescription);
  const lastUpdatedTime = format('eee MMM Do @ h:mm a')(new Date(dt));

  return (
    <section className={style.overview}>
      <div className={style.backdrop} />

      <Paper className={style.currentWeather}>
        <section className={style.location}>
          <Typography variant="h4" align="left">
            {name}, {country}
          </Typography>
          <Typography variant="caption" align="left">
            Last updated: {lastUpdatedTime}
          </Typography>
        </section>
        <section className={style.temperature}>
          <Typography variant="h2" component="h2" align="center">
            {tempInCelsius}°C
          </Typography>
          <Typography variant="subtitle1" align="center">
            {formattedDescription}
          </Typography>
        </section>
        <figure className={style.weatherIcon}>
          <img
            src={`http://openweathermap.org/img/w/${iconID}.png`}
            alt={shortDescription}
          />
        </figure>
      </Paper>
    </section>
  );
}

export default CurrentWeather;
