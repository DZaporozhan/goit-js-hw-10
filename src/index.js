import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputName: document.querySelector('#search-box'),
  listCountries: document.querySelector('.country-list'),
  infoCountry: document.querySelector('.country-info'),
};

refs.inputName.addEventListener(
  'input',
  debounce(inputCountryName, DEBOUNCE_DELAY)
);

function inputCountryName(evt) {
  let name = evt.target.value.trim();

  if (!name) {
    clearMarkup();
    return;
  }

  fetchCountries(name)
    .then(countries => {
      if (countries.length > 10) {
        clearMarkup();
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (countries.length >= 2 && countries.length <= 10) {
        return rendorList(countries);
      }
      if (countries.length === 1) {
        return rendorInfoCountry(countries);
      }
    })

    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function rendorList(countries) {
  clearMarkup();
  const markup = countries
    .map(
      country => `<li class="list-item"><img class="country_picture"
     src=${country.flags.svg}
     alt=${country.name.official}
     width="30" ><p>${country.name.official}</p></li>`
    )
    .join('');

  return refs.listCountries.insertAdjacentHTML('beforeend', markup);
}

function rendorInfoCountry(countries) {
  clearMarkup();
  const {
    name: { official },
    capital,
    population,
    flags: { svg },
    languages,
  } = countries[0];
  const langList = Object.values(languages);
  const markup = `<div class="cart_title"><img class="country_picture"
     src=${svg}
     alt=${official}
     width="30" >
     <h1>${official}</h1></div>
     <div class="cart_footer">
     <p class="text"><span class="label">Capital:</span>${capital}</p>
     <p  class="text"><span class="label">Population:</span>${population}</p>
     <p  class="text"><span class="label">Languages:</span>${langList}</p>
     </div>`;

  return refs.infoCountry.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  refs.infoCountry.innerHTML = '';
  refs.listCountries.innerHTML = '';
}
