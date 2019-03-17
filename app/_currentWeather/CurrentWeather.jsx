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
import CircularProgress from '@material-ui/core/CircularProgress';
import Attribution from '../common/Attribution';
import GridItem from './GridItem';
/* App Files */
import secret from '../secret';
import {
  CURRENT_WEATHER_END_POINT,
  KMH,
  MPH,
  CELSIUS,
  FAHRENHEIT,
  PHOTOS,
} from '../common/constants';
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
  const [error, setError] = useState(false);
  const CURRENT_WEATHER = 'currentWeather';

  const fetch = (coords) => {
    const { latitude, longitude } = coords;
    axios
      .get(
        `${CURRENT_WEATHER_END_POINT}lat=${latitude}&lon=${longitude}&APPID=${
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
        setError(true);
        console.error(err);
      });
  };

  // Fetching Weather Data based on GeoLocation.
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem(CURRENT_WEATHER));
    if (!isEmpty(localData)) {
      const timeOfStorage = new Date(localData.time); // need to fixe since localData may not be set.
      const now = new Date();
      const minutesBetweenStorageAndNow = differenceInMinutes(
        timeOfStorage,
        now
      );
      if (minutesBetweenStorageAndNow < 30) {
        setWeatherData(localData.weatherData);
      } else {
        fetch(position);
      }
    } else {
      fetch(position);
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
    main: weatherType,
  } = weather[0];
  const { temp, pressure, humidity, temp_min, temp_max } = main;
  const { speed: windSpeed, deg: windDeg, gust: windGust = 0 } = wind;
  const { sunrise = 0, sunset = 0, country } = sys;
  const formatToTime = format('h:mm a');
  const tempInCelsius = kelvinToCelsius(temp);
  const formattedDescription = upperFirst(weatherDescription);
  const lastUpdatedTime = format('eee MMMM do @ h:mm a')(dt * 1000);
  const windSpeedKMH = (parseInt(windSpeed, 10) * 3.6).toFixed();
  const windGustKMH = (parseInt(windGust, 10) * 3.6).toFixed();

  console.log(weatherType);
  const backgroundClass = classnames({
    [style.backdrop]: true,
    [style.clouds]: weatherType === 'Clouds',
    [style.clear]: weatherType === 'Clear',
    [style.snow]: weatherType === 'Snow',
    [style.rain]: weatherType === 'Rain' || weatherType === 'Drizzle',
    [style.thunderstorm]: weatherType === 'Thunderstorm',
  });

  return (
    <section className={style.wrapper}>
      <div className={backgroundClass} />
      <Attribution {...PHOTOS[weatherType]} />
      {error ? (
        <React.Fragment>
          <CircularProgress color="secondary" className={style.loading} />
          <Typography variant="h3">There was an error loading data.</Typography>
        </React.Fragment>
      ) : (
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
              alt={weatherType}
            />
          </figure>
          <section className={style.extras}>
            <GridItem
              classname={style.wind}
              title="Wind"
              value={windSpeedKMH}
              units={KMH}
              extra={degreesToCompass(windDeg)}
            />
            <GridItem
              classname={style.windGust}
              title="Wind Gust"
              value={windGustKMH !== '0' ? windGustKMH : 'N/A'}
              units={windGustKMH !== '0' ? KMH : null}
            />
            <GridItem
              classname={style.humidity}
              title="Humidity"
              value={humidity}
              units="%"
            />
            <GridItem
              classname={style.pressure}
              title="Pressure"
              value={pressure}
              units=" kPa"
            />
            <GridItem
              classname={style.sunrise}
              title="Sunrise"
              value={formatToTime(sunrise * 1000)}
            />
            <GridItem
              classname={style.sunset}
              title="Sunset"
              value={formatToTime(sunset * 1000)}
            />
          </section>
        </Paper>
      )}
    </section>
  );
}

export default CurrentWeather;
