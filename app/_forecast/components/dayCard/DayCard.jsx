import React from 'react';
import format from 'date-fns/fp/format';
import { compose } from 'ramda';
import { upperFirst } from 'lodash';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

import style from './style.scss';

import {
  celsiusToFahrenheit,
  celsiusToKelvin,
  kelvinToCelsius,
  kelvinTofahrenheit,
  fahrenheitToCelsius,
  fahrenheitToKelvin,
  tempGenerator,
} from '../../../common/utils';

const DayCard = (props) => {
  const {
    data: { dt, speed, temp, weather },
  } = props;
  const date = new Date(dt * 1000);
  const dayOfWeek = format('ccc', date);
  const formattedDate = format('MMM dd, yyyy', date);
  const dailyHigh = kelvinToCelsius(temp.max);
  const dailyLow = kelvinToCelsius(temp.min);
  const { icon, description, main: mainDescription } = weather[0];
  const formattedDescription = upperFirst(description);

  return (
    <Card className={style.dayCard}>
      <CardHeader
        title={dayOfWeek}
        subheader={formattedDate}
        align="center"
        className={style.header}
      />
      <CardContent align="center" className={style.main}>
        <Typography variant="body1" className={style.highLow}>
          {dailyHigh}°C / {dailyLow}°C
        </Typography>
      </CardContent>
      <CardContent className={style.footer}>
        <img
          src={`http://openweathermap.org/img/w/${icon}.png`}
          alt={mainDescription}
        />
        <Typography
          variant="body2"
          align="center"
          className={style.description}
        >
          {formattedDescription}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DayCard;
