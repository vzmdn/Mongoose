const url = 'https://thispersondoesnotexist.com/api/getImage';

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

console.log('este js es de test')