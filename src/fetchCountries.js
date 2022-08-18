const url = 'https://restcountries.com/v3.1/name/';

const searchParams = ['name', 'capital', 'population', 'flags', 'languages'];
let params = searchParams.join(',');

export function fetchCountries(name) {
  return fetch(`${url}${name}?fields=${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
