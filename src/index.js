import countryCardTpl from "./templates/country.hbs";
import countriesListTpl from "./templates/lang-list.hbs";
import API from './js/fetchCountries.js';
import getRefs from './js/get-refs';
const debounce = require('lodash.debounce');
const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    e.preventDefault();
    const searchQuery = e.target.value.toLowerCase();
    API.fetchCountries(searchQuery)
        .then(data => {
            if (data.length === 1) {
                renderCountry(data);
            } else if (data.length > 1 && data.length <= 10) {
                renderCountriesList(data);
            }
        })
        .catch(error => {
            onFetchError();
            e.target.value = '';
        });
}

function renderCountry(country) {
    const markup = countryCardTpl(country)
    refs.container.innerHTML = markup
}
function renderCountriesList(countries) {
    const markupList = countriesListTpl(countries);
    refs.container.innerHTML = markupList;
}

function onFetchError(error) {
    alert('Fucking query')
}