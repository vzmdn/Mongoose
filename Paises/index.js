
const url = 'https://restcountries.com/v3.1/all?fields=name,flags'; // Define the API URL

fetch(url) // Make the fetch request
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        createFlags(data); // Process the data
    })
    .catch(error => {
        console.error('Error fetching data:', error); // Handle any errors
    });

function createFlags(data){
    data.forEach(country => {
        const div = document.createElement('div');
        div.title = country.name.common;
        div.className = "bandera";
        div.innerHTML = `<img src="${country.flags.png}">`;
        document.getElementById('container').appendChild(div);
    });
}