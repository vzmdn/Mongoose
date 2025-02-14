const mongoose = require('mongoose');
const fs = require('fs');

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/preguntas', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Definición del esquema
const preguntaSchema = new mongoose.Schema({
  nombre_videojuego: { type: String, required: true }, // Nuevo campo agregado
  pregunta: { type: String, required: true, unique: true }, // Modificado para ser único
  opciones: { type: [String], required: true },
  respuesta_correcta: { type: Boolean, required: true }, // Modificado a Boolean
  puntuacion: { type: Number, required: true, min: 0, max: 10 } // Nuevo campo agregado con rango
});

const Pregunta = mongoose.model('Pregunta', preguntaSchema);

// Importación desde preguntas.json
fs.readFile('../preguntas.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo preguntas.json', err);
    return;
  }

  const preguntas = JSON.parse(data);

  Pregunta.insertMany(preguntas)
    .then(() => {
      console.log('Datos importados correctamente');
      mongoose.connection.close();
    })
    .catch(err => {
      console.error('Error al importar los datos', err);
      mongoose.connection.close();
    });
});