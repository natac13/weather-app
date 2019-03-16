import React from 'react';
import style from './style.scss';

const WeatherView = ({ children }) => {
  return <main className={style.page}>{children}</main>;
};

export default WeatherView;
