// export default fetchCountries(name) {
//     if (name) {
//         return (`https://restcountries.com/v3.1/name/${name}/?fields=name,capital,population,flags,languages`)
//             .then(response => {
//                 if (responce.ok) {
//                     return response.json();
//                 }
//             })
//         throw new Error('Error fetching data');
//     }
// }
function onInput(event) { 
    const name = event.currentTarget.value.trim();
    console.log(name);
    
    fetchCountries(name)
        .then(renderCountryCard)
        .catch(onFetchError)
        // .finally(() => input.requestFullscreen());
}

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => response.json())
        .then(console.log)
}

function renderCountryCard(country) {
    const markup = countryCard(country);
    countryCardInfo.innerHTML = markup;
}

function onFetchError(error) {
    console.log(error);
}