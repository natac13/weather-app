import React, { useState, useEffect } from 'react';
import axios from 'axios';
import isEmpty from 'is-empty';
import differenceInMinutes from 'date-fns/fp/differenceInMinutes';
/* Components */
import Typography from '@material-ui/core/Typography';
import DayCard from './components/dayCard';
/* App Files */
import secret from '../secret';
import { forecastEndPoint } from '../common/constants';
/* Style */
import style from './style.scss';
/* Main Component */
function Forecast(props) {
  const { position } = props;
  const [weatherData, setWeatherData] = useState({});
  const FORECAST = 'forecast';
  const { localStorage } = window;

  // Fetching Weather Data based on GeoLocation.
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem(FORECAST));
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
          `${forecastEndPoint}cnt=14&lat=${latitude}&lon=${longitude}&APPID=${
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
          localStorage.setItem(FORECAST, JSON.stringify(toStoreData));
          setWeatherData(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [position]);

  const { city = {}, list: forecastList = [] } = weatherData;
  const { country, id, name } = city;

  const weatherCards = forecastList.map((day) => {
    return <DayCard data={day} key={day.dt} />;
  });

  return (
    <section className={style.wrapper}>
      <Typography variant="h3" className={style.header} align="center">
        14-Day Forecast
      </Typography>
      <section className={style.forecast}>{weatherCards}</section>
    </section>
  );
}

export default Forecast;
