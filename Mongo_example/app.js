const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/contactos');

//ESQUEMA
let contactoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^\d{9}$/
    },
    edad: {
        type: Number,
        min: 18,
        max: 120
    }
});

//MODELO
let Contacto = mongoose.model('contactos', contactoSchema);

//AÑADIR DOCUMENTOS
let contacto1 = new Contacto({
    nombre: "Boris",
    telefono: "946112230",
    edad: 49
});

let p1 = contacto1.save().then(resultado => {
    console.log("contacto añadido: ", resultado);
}).catch(error => {
    console.log("ERROR añadiendo contacto: ", error)
})


//BUSCAR DOCUMENTOS
let p2 = Contacto.find().then(resultado => {
    console.log("contacto encontrado: ", resultado);
}).catch(error => {
    console.log("ERROR: ", error);
})


//BUSCAR CON PARÁMETROS
let p3 = Contacto.find({ nombre: 'Boris', edad: 49 }).then(resultado => {
    console.log("contacto encontrado", resultado);
}).catch(error => {
    console.log("Error: ", error)
})


//BORRAR
/*
let p4 = Contacto.deleteOne({ nombre: 'Boris' }).then(resultado => {
    console.log("contacto eliminado: ", resultado);
}).catch(error => {
    console.log("ERROR:", error);
});
*/

//ACTUALIZAR
let p5 = Contacto.findOneAndUpdate(
    { nombre: 'Boris' },
    { nombre: 'Boris Anaya', edad: 50 },
    { new: true }) //para mostrar el contacto despues de actualizarlo
    .then(resultado => {
        console.log("contacto actualizado: ", resultado)
    })


//ESPERAR PROMESAS PARA CERRAR
Promise.all([p1, p2, p3, p5]).then(values => {
    mongoose.connection.close();
});