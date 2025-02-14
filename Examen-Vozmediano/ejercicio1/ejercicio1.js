import fetch from 'node-fetch';
import fs from 'fs';

const url = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=boolean';

async function fetchQuestions() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const results = data.results.map(result => ({
            nombre_videojuego: "Juego ejemplo",
            pregunta: result.question,
            opciones: ['True', 'False'],
            respuesta_correcta: result.correct_answer === 'True', // Convertir a Boolean
            puntuacion: Math.floor(Math.random() * 11) // Generar puntuación aleatoria entre 0 y 10
        }));
        fs.writeFileSync('../preguntas.json', JSON.stringify(results, null, 2));
        console.log('Preguntas guardadas en preguntas.json');
    } catch (error) {
        console.error('Error al recuperar las preguntas:', error);
    }
}

fetchQuestions();