import './css/styles.css';
import countryCard from "./country-card.hbs";
import countriesList from "./countries-list.hbs";
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
// import FetchCountris from "./fetchCountries";

const DEBOUNCE_DELAY = 300;
const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryCardInfo = document.querySelector(".country-info");

input.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
    const name = event.target.value.trim();

    if (!name) { 
        countryList.innerHTML = "";
        return null;
    };
    
    fetchCountries(name)
        // .then(renderCountryCard)
        .then(renderCountries)
        .catch(onFetchError)
        // .finally(() => input.reset());
}

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => response.json())
}

function renderCountries(countries) {
    console.log(countries);

    if (countries.length === 1) {
        const markup = countries.map((country) => {
            const languages = Object.values(country.languages).join(", ");
            country.languages = languages;
            return countryCard(country)
        }).join("");
        countryCardInfo.innerHTML = markup;
        countryList.innerHTML = "";
    } else {
        const markup = countries.map((country) => {
            return countriesList(country)
        }).join("");
        countryList.innerHTML = markup;
        countryCardInfo.innerHTML = "";
    }
}

// function renderCountryCard(country) {
//     const markup = countryCard(country);
//     countryCardInfo.innerHTML = markup;
// }

function onFetchError(error) {
    console.log(error);
}