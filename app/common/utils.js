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
  const val = Math.floor(degrees / 45 + 0.5);
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[val % directions.length];
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
