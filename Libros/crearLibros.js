const container = document.getElementById('container');


fetch('files/books.json').then(response => {
    return response.json()
    .then(books => {
        books.forEach(book => {
            const div = document.createElement('div');
            div.id = book.img.replace(/^\D+/g, '');
            div.innerHTML = book.title;
            container.appendChild(div);
        })
    })
});
