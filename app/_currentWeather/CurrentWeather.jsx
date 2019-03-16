import React, { useState, useEffect } from 'react';
import axios from 'axios';
import isEmpty from 'is-empty';
import differenceInMinutes from 'date-fns/fp/differenceInMinutes';
import format from 'date-fns/fp/format';
import { upperFirst } from 'lodash';
import classnames from 'classnames';
/* Components */
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
/* App Files */
import secret from '../secret';
import { currentWeatherEndPoint } from '../common/constants';
import {
  celsiusToFahrenheit,
  celsiusToKelvin,
  kelvinToCelsius,
  kelvinTofahrenheit,
  fahrenheitToCelsius,
  fahrenheitToKelvin,
  tempGenerator,
  degreesToCompass,
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
  console.log(weatherData);
  const {
    icon: iconID,
    description: weatherDescription,
    main: shortDescription,
  } = weather[0];
  const { temp, pressure, humidity, temp_min, temp_max } = main;
  const { speed: windSpeed, deg: windDeg, gust: windGust } = wind;
  const { sunrise = 0, sunset = 0, country } = sys;
  const formatToTime = format('h:mm a');
  const tempInCelsius = kelvinToCelsius(temp);
  const formattedDescription = upperFirst(weatherDescription);
  const lastUpdatedTime = format('eee MMM Do @ h:mm a')(new Date(dt));
  const windSpeedKMH = (parseInt(windSpeed, 10) * 3.6).toFixed();
  const windGustKMH = (parseInt(windGust, 10) * 3.6).toFixed();

  console.log(shortDescription);
  const backgroundClass = classnames({
    [style.backdrop]: true,
    [style.clouds]: shortDescription === 'Clouds',
    [style.clear]: shortDescription === 'Clear',
    [style.snow]: shortDescription === 'Snow',
    [style.rain]: shortDescription === 'Rain',
    [style.rain]: shortDescription === 'Drizzle',
    [style.thunderstorm]: shortDescription === 'Thunderstorm',
  });

  return (
    <section className={style.overview}>
      <div className={backgroundClass} />
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
        <section className={style.extras}>
          <div className={style.wind}>
            <Typography variant="subtitle1">Wind</Typography>
            <Typography variant="body1">
              {windSpeedKMH}
              <span>km/h {degreesToCompass(windDeg)}</span>
            </Typography>
          </div>
          <div className={style.windGust}>
            <Typography variant="subtitle1">Wind Gust</Typography>
            <Typography variant="body1">
              {windGustKMH}
              <span>km/h</span>
            </Typography>
          </div>
          <div className={style.humidity}>
            <Typography variant="subtitle1">Humidity</Typography>
            <Typography variant="body1">
              {humidity}
              <span>%</span>
            </Typography>
          </div>
          <div className={style.pressure}>
            <Typography variant="subtitle1">Pressure</Typography>
            <Typography variant="body1">
              {pressure} <span>kPa</span>
            </Typography>
          </div>
          <div className={style.sunrise}>
            <Typography variant="subtitle1">Sunrise</Typography>
            <Typography variant="body1">
              {formatToTime(sunrise * 1000)}
            </Typography>
          </div>
          <div className={style.sunset}>
            <Typography variant="subtitle1">Sunset</Typography>
            <Typography variant="body1">
              {formatToTime(sunset * 1000)}
            </Typography>
          </div>
        </section>
      </Paper>
    </section>
  );
}

export default CurrentWeather;
