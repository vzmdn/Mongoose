const mongoose = require('mongoose');
let bookArray = [];



const libroSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
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

let responsiveSelect = () => {
    const select = document.getElementById('select');
    const title = select.value;
    if (title === '') return;

    mongoose.connect('mongodb://localhost:27017/libros');
    let Libro;
    try {
        Libro = mongoose.model('libros');
    } catch (error) {
        Libro = mongoose.model('libros', libroSchema);
    }
    Libro.findOne({ title: title }).then(book => {
        if (book) {
            document.getElementById('titulo').value = book.title;
            document.getElementById('autor').value = book.author;
        }
    }).catch(error => {
        console.log("Error fetching book details: ", error);
    });
}



let cargarSelect = () => {
    const select = document.getElementById('select');
    select.innerHTML = '';
    bookArray.forEach(book => {
        const option = document.createElement('option');
        option.value = book.title;
        option.text = book.title;
        select.appendChild(option);
    })
}

let editarLibro = () => {
    const select = document.getElementById('select');
    const title = select.value;
    if (title === '') return;
    let newTitle = document.getElementById('titulo').value;
    let newAutor = document.getElementById('autor').value;
    
    mongoose.connect('mongodb://localhost:27017/libros');
    try {
        Libro = mongoose.model('libros');
    } catch (error) {
        Libro = mongoose.model('libros', libroSchema);
    }
    Libro.findOneAndUpdate(
        {title: title},
        {title: newTitle, author: newAutor}
    ).then(() => {
        cargarLibrosMongo();
        document.getElementById('titulo').value = '';
        document.getElementById('autor').value = '';
    }
    )


}


let actualizarCargados = () => {
    document.getElementById('cargados').innerHTML = `Libros cargados:  ${bookArray.length}`;
    cargarSelect();
}

let limpiarContainer = () => {
    const container = document.getElementById('container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

let cargarLibrosJSON = () => {
    hideMenus();
    bookArray = [];
    limpiarContainer();
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
                actualizarCargados();
            })
    });

}

let cargarLibrosMongo = () => {
    bookArray = [];
    limpiarContainer();
    mongoose.connect('mongodb://localhost:27017/libros');
    try {
        Libro = mongoose.model('libros');
    } catch (error) {
        Libro = mongoose.model('libros', libroSchema);
    }
    Libro.find().then(resultado => {
        resultado.forEach(book => {
            bookArray.push(book);
            const div = document.createElement('div');
            div.id = book.img.replace(/^\D+/g, '');
            const img = document.createElement('img');
            img.src = `files/${book.img}`;
            img.title = `${book.title}\n${book.author}`;
            div.appendChild(img);
            container.appendChild(div);
        })
        actualizarCargados();
        responsiveSelect();
        if(bookArray.length > 0) showMenus();
    }).catch(error => {
        console.log("ERROR: ", error);
        hideMenus();
    });

}

let guardarLibros = () => {
    mongoose.connect('mongodb://localhost:27017/libros');
    
    let Libro;
    try {
        Libro = mongoose.model('libros');
    } catch (error) {
        Libro = mongoose.model('libros', libroSchema);
    }
    bookArray.forEach(async book => {
        let libro = new Libro({
            title: book.title,
            author: book.author,
            img: book.img
        });
        await libro.save().then(resultado => {
            console.log("Libro añadido: ", resultado);
            if(bookArray.length > 0) showMenus();
        }).catch(error => {
            console.log("ERROR añadiendo libro: ", error)
        })
    })
}

let eliminarLibros = () => {
    bookArray = [];
    limpiarContainer();
    mongoose.connect('mongodb://localhost:27017/libros');
    let Libro;
    try {
        Libro = mongoose.model('libros');
    } catch (error) {
        Libro = mongoose.model('libros', libroSchema);
        return;
    }
    Libro.deleteMany().then(resultado => {
        console.log("Libros borrados: ", resultado);
        actualizarCargados();
        document.getElementById('titulo').value = '';
        document.getElementById('autor').value = '';
        hideMenus();
    })
    .catch(error => {
        console.log("ERROR borrando libros: ", error);
    })
}

let eliminarLibro = () => {
    const select = document.getElementById('select');
    const title = select.value;
    if (title === '') return;
    
    mongoose.connect('mongodb://localhost:27017/libros');
    try {
        Libro = mongoose.model('libros');
    } catch (error) {
        Libro = mongoose.model('libros', libroSchema);
    }
    Libro.deleteOne(
        {title: title}
    ).then(() => {
        cargarLibrosMongo();
        document.getElementById('titulo').value = '';
        document.getElementById('autor').value = '';
    }
    )
}

let hideMenus = () => {
    const menu2 = document.getElementById('menu2');
    const menu3 = document.getElementById('menu3');
    menu2.style.display = 'none';
    menu3.style.display = 'none';
}

let showMenus = () => {
    const menu2 = document.getElementById('menu2');
    const menu3 = document.getElementById('menu3');
    menu2.style.display = 'block';
    menu3.style.display = 'block';
}

const cargarJsonBtn = document.getElementById('cargarJson');
cargarJsonBtn.addEventListener('click', cargarLibrosJSON);

const guardarBtn = document.getElementById('guardar');
guardarBtn.addEventListener('click', guardarLibros);

const eliminarBtn = document.getElementById('eliminar');
eliminarBtn.addEventListener('click', eliminarLibros);

const cargarMongoBtn = document.getElementById('cargarMongo');
cargarMongoBtn.addEventListener('click', cargarLibrosMongo);

const editarLibroBtn = document.getElementById('editar');
editarLibroBtn.addEventListener('click', editarLibro);

const selectSelect = document.getElementById('select');
selectSelect.addEventListener('change', responsiveSelect);

const eliminarLibroBtn = document.getElementById('eliminarLibro');
eliminarLibroBtn.addEventListener('click', eliminarLibro);

hideMenus();