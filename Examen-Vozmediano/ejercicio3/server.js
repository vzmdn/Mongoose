const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/preguntas', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Definición del esquema
const preguntaSchema = new mongoose.Schema({
  nombre_videojuego: { type: String, required: true },
  pregunta: { type: String, required: true, unique: true },
  opciones: { type: [String], required: true },
  respuesta_correcta: { type: Boolean, required: true },
  puntuacion: { type: Number, required: true, min: 0, max: 10 }
});

const Pregunta = mongoose.model('Pregunta', preguntaSchema);

// Endpoints
app.get('/preguntas', async (req, res) => {
  try {
    const preguntas = await Pregunta.find();
    res.json(preguntas);
  } catch (err) {
    res.status(500).send('Error al obtener las preguntas');
  }
});

app.get('/preguntas/:id', async (req, res) => {
  try {
    const pregunta = await Pregunta.findById(req.params.id);
    if (!pregunta) {
      return res.status(404).send('Pregunta no encontrada');
    }
    res.json(pregunta);
  } catch (err) {
    res.status(500).send('Error al obtener la pregunta');
  }
});

app.post('/preguntas', async (req, res) => {
  try {
    const nuevaPregunta = new Pregunta(req.body);
    await nuevaPregunta.save();
    res.status(201).send('Pregunta creada');
  } catch (err) {
    res.status(400).send('Error al crear la pregunta');
  }
});

app.put('/preguntas/:id', async (req, res) => {
  try {
    const preguntaActualizada = await Pregunta.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!preguntaActualizada) {
      return res.status(404).send('Pregunta no encontrada');
    }
    res.send('Pregunta actualizada');
  } catch (err) {
    res.status(400).send('Error al actualizar la pregunta');
  }
});

app.delete('/preguntas/:id', async (req, res) => {
  try {
    const preguntaEliminada = await Pregunta.findByIdAndDelete(req.params.id);
    if (!preguntaEliminada) {
      return res.status(404).send('Pregunta no encontrada');
    }
    res.send('Pregunta eliminada');
  } catch (err) {
    res.status(500).send('Error al eliminar la pregunta');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});