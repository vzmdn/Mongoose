//const mongoose = require('mongoose');
//connect('mongodb://localhost:27017/libros');
let bookArray = [];

cargarLibrosJSON();

//guardarLibrosMongo();

function cargarLibrosJSON() {
    bookArray = [];
    const container = document.getElementById('container');
    fetch('files/books.json').then(response => {
        return response.json()
            .then(books => {
                books.forEach(book => {
                    bookArray.push(book);
                    const div = document.createElement('div');
                    div.id = book.img.replace(/^\D+/g, '');
                    const img = document.createElement('img');
                    img.src = `files/${book.img}`;
                    img.title = `${book.title}\n${book.author}`;
                    div.appendChild(img);
                    container.appendChild(div);
                })
            })
    });
}

function guardarLibrosMongo() {
    connect('mongodb://localhost:27017/libros');
    let libroSchema = new Schema({
        title: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
        author: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
        img: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        }

    });
    let Libro = model('libros', libroSchema);
    bookArray.forEach(async book => {
        let libro = new Libro({
            title: book.title,
            author: book.author,
            img: book.img
        });
        let p = await libro.save().then(resultado => {
            console.log("Libro añadido: ", resultado);
        }).catch(error => {
            console.log("ERROR añadiendo libro: ", error)
        })
    })
}

