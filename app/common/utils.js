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

const tempGenerator = (temp, units) => {
  return temp;
};

export {
  celsiusToFahrenheit,
  celsiusToKelvin,
  kelvinToCelsius,
  kelvinTofahrenheit,
  fahrenheitToCelsius,
  fahrenheitToKelvin,
  tempGenerator,
};
