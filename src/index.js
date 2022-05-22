import './css/styles.css';
import countryCard from "./country-card.hbs";
import countriesList from "./countries-list.hbs";
import Notiflix from 'notiflix';
// import FetchCountris from "./fetchCountries";

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');
const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryCardInfo = document.querySelector(".country-info");

input.addEventListener("input", onInput);
// debounce(onInput, DEBOUNCE_DELAY))

function onInput(event) { 
    const name = event.currentTarget.value.trim();
    console.log(name);
    
    fetchCountries(name)
        // .then(renderCountryCard)
        .then(countries => {
            console.log("to e :", countries)
            countries.forEach(element => {
                renderCountriesList(element.name);
            });
        })
        .catch(onFetchError)
        // .finally(() => input.requestFullscreen());
}

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => response.json())
}

function renderCountriesList(country) { 
    const markup = countriesList(country);
    countryList.innerHTML = markup;
}

function renderCountryCard(country) {
    const markup = countryCard(country);
    countryCardInfo.innerHTML = markup;
}

function onFetchError(error) {
    console.log(error);
}