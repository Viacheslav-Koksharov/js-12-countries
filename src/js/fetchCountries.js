const BASE_URL = 'https://restcountries.com/v2/name'

function fetchCountries(searchQuery) {
    const url = `${BASE_URL}/${searchQuery}?fields=name,capital,population,languages,flag`
    return fetch(url)
        .then(status)
        .then(json)
}
function status(response) {
    if (response.status !== 200) {
        return Promise.reject(new Error(response.statusText));
    }
    return Promise.resolve(response);
}

function json(response) {
    return response.json();
}

export default { fetchCountries }