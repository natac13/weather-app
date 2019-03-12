import React from 'react';
import format from 'date-fns/fp/format';
import { compose } from 'ramda';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import style from './style.scss';

const kelvinToCelsius = (temp) => temp - 273.15;
const celsiusToKelvin = (temp) => temp + 273.15;
const celsiusToFahrenheit = (temp) => temp * 1.8 + 32;
const fahrenheitToCelsius = (temp) => (temp - 32) / 1.8;
const fahrenheitToKelvin = compose(
  celsiusToKelvin,
  fahrenheitToCelsius
);
const kelvinTofahrenheit = compose(
  celsiusToFahrenheit,
  kelvinToCelsius
);

const tempGenerator = (temp, units) => {
  return temp;
};

const DayCard = (props) => {
  const {
    data: { dt, speed, temp, weather },
  } = props;
  const date = new Date(dt * 1000);
  const dayOfWeek = format('ccc', date);
  const formattedDate = format('MMM dd, yyyy', date);
  const dailyHigh = kelvinToCelsius(temp.max).toFixed(1);
  const dailyLow = kelvinToCelsius(temp.min).toFixed(1);

  return (
    <Card className={style.dayCard}>
      <CardHeader title={dayOfWeek} subheader={formattedDate} align="center" />
      <CardContent align="center">
        <Typography variant="body1">
          {dailyHigh}°C / {dailyLow}°C
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" align="center">
          {weather[0].description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DayCard;
