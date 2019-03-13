import React, { useState, useEffect } from 'react';

import DayCard from './components/dayCard';

import style from './style';

function Forecast(props) {
  const { forecastList } = props;

  const weatherCards = forecastList.map((day) => {
    return <DayCard data={day} key={day.dt} />;
  });

  return <section className={style.wrapper}>{weatherCards}</section>;
}

export default Forecast;
