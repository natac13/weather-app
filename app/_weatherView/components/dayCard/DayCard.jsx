import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import style from './style.scss';

const DayCard = (props) => {
  return (
    <Card className={style.dayCard}>
      <CardHeader title="Monday" subheader="March 11, 2019" align="center" />
      <CardContent align="center">Icon and Temp</CardContent>
    </Card>
  );
};

export default DayCard;
