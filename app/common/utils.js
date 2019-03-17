import { compose } from 'ramda';

const kelvinToCelsius = (temp) => (parseInt(temp, 10) - 273.15).toFixed(1);

const celsiusToKelvin = (temp) => (parseInt(temp, 10) + 273.15).toFixed(1);

const celsiusToFahrenheit = (temp) =>
  (parseInt(temp, 10) * 1.8 + 32).toFixed(1);

const fahrenheitToCelsius = (temp) =>
  ((parseInt(temp, 10) - 32) / 1.8).toFixed(1);

const fahrenheitToKelvin = compose(
  celsiusToKelvin,
  fahrenheitToCelsius
);

const kelvinTofahrenheit = compose(
  celsiusToFahrenheit,
  kelvinToCelsius
);

const degreesToCompass = (x) => {
  const degrees = parseInt(x, 10);
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const divisor = 360 / (directions.length * 2);
  const val = Math.round(degrees / divisor / 2);
  return directions[val];
};

export {
  celsiusToFahrenheit,
  celsiusToKelvin,
  kelvinToCelsius,
  kelvinTofahrenheit,
  fahrenheitToCelsius,
  fahrenheitToKelvin,
  degreesToCompass,
};
