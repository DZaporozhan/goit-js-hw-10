import './css/styles.css';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const url = 'https://restcountries.com/v3.1/name/';

const searchParams = [name.official, capital, population, flags.svg, languages];

const refs = {
  inputName: document.querySelector('#search-box'),
};

refs.inputName.addEventListener(
  'input',
  debounce(fetchCountries, DEBOUNCE_DELAY)
);

function fetchCountries(name) {}
