import React, { useState, useEffect } from 'react';
import axios from 'axios';
import isEmpty from 'is-empty';
import differenceInMinutes from 'date-fns/fp/differenceInMinutes';
import format from 'date-fns/fp/format';
import { upperFirst } from 'lodash';
/* Components */
import Typography from '@material-ui/core/Typography';
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
    dt, // time of weather
    weather = {},
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
  const { sunrise = 0, sunset = 0 } = sys;
  const formatToTime = format('h:mm a');
  const tempInCelsius = kelvinToCelsius(temp);
  const formattedDescription = upperFirst(weatherDescription);

  return (
    <section className={style.overview}>
      <figure className={style.backdrop}>
        <img src={clouds} alt="description" />
      </figure>
      <div className={style.currentWeather}>
        <Typography variant="h2" component="h1">
          {tempInCelsius}°C
        </Typography>
        <Typography variant="subtitle1" align="center">
          {formattedDescription}
        </Typography>
      </div>
    </section>
  );
}

export default CurrentWeather;
