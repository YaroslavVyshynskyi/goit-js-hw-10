import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from "./fetchCountries";
import countryCard from "./country-card.hbs";
import countryItem from "./country-item.hbs";

const DEBOUNCE_DELAY = 300;
const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryCardWrap = document.querySelector(".country-info");

input.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
    const name = event.target.value.trim();

    if (!name) {
        countryList.innerHTML = "";
        countryCardWrap.innerHTML = "";
        throw new Error('Error fetching data');
    };
    
    fetchCountries(name)
        .then(renderCountries)
        .catch(onFetchError)
}

function renderCountries(countries) {

    if (countries.length === 1) {
        const markup = countries.map((country) => {
            const languages = Object.values(country.languages).join(", ");
            country.languages = languages;
            return countryCard(country)
        }).join("");
        countryCardWrap.innerHTML = markup;
        countryList.innerHTML = "";
    } else
        if (countries.length > 10) {
            countryList.innerHTML = "";
            countryCardWrap.innerHTML = "";
            Notiflix.Notify.success("Too many matches found. Please enter a more specific name.")
        } else { const markup = countries.map((country) => {
            return countryItem(country)}).join("");
            countryList.innerHTML = markup;
            countryCardWrap.innerHTML = "";
            }
}

function onFetchError(Error) {
    countryList.innerHTML = "";
    countryCardWrap.innerHTML = "";
    Notiflix.Notify.failure("Oops, there is no country with that name");
}
