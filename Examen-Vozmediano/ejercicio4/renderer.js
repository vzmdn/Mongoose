async function loadQuestions() {
    try {
        const response = await fetch('http://localhost:3000/preguntas');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const preguntas = await response.json();
        displayQuestions(preguntas);
    } catch (error) {
        console.error('Error al cargar las preguntas:', error);
        document.getElementById('error').innerText = 'Error al cargar las preguntas. Inténtalo de nuevo más tarde.';
    }
}

function displayQuestions(preguntas) {
    const questionsList = document.getElementById('questions-list');
    questionsList.innerHTML = '';

    preguntas.forEach(pregunta => {
        const listItem = document.createElement('tr');
        listItem.innerHTML = `
            <td>${pregunta.nombre_videojuego}</td>
            <td>${pregunta.pregunta}</td>
            <td>${pregunta.respuesta_correcta}</td>
            <td>${pregunta.puntuacion}</td>
            <td>
                <button onclick="editQuestion('${pregunta._id}')">Editar</button>
                <button onclick="deleteQuestion('${pregunta._id}')">Eliminar</button>
            </td>
        `;
        questionsList.appendChild(listItem);
    });
}

async function editQuestion(id) {
    try {
        const response = await fetch(`http://localhost:3000/preguntas/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const pregunta = await response.json();

        document.getElementById('nombre_videojuego').value = pregunta.nombre_videojuego;
        document.getElementById('pregunta').value = pregunta.pregunta;
        document.getElementById('respuesta_correcta').value = pregunta.respuesta_correcta;
        document.getElementById('puntuacion').value = pregunta.puntuacion;
        document.getElementById('question-id').value = pregunta._id;
    } catch (error) {
        console.error('Error al cargar la pregunta:', error);
        document.getElementById('error').innerText = 'Error al cargar la pregunta. Inténtalo de nuevo más tarde.';
    }
}

async function deleteQuestion(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar esta pregunta?')) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/preguntas/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        loadQuestions();
    } catch (error) {
        console.error('Error al eliminar la pregunta:', error);
        document.getElementById('error').innerText = 'Error al eliminar la pregunta. Inténtalo de nuevo más tarde.';
    }
}

async function addQuestion(event) {
    event.preventDefault();

    const nombre_videojuego = document.getElementById('nombre_videojuego').value;
    const pregunta = document.getElementById('pregunta').value;
    const respuesta_correcta = document.getElementById('respuesta_correcta').value;
    const puntuacion = document.getElementById('puntuacion').value;
    const id = document.getElementById('question-id').value;

    if (!nombre_videojuego || !pregunta || !respuesta_correcta || !puntuacion) {
        document.getElementById('error').innerText = 'Todos los campos son obligatorios.';
        return;
    }

    try {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `http://localhost:3000/preguntas/${id}` : 'http://localhost:3000/preguntas';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre_videojuego,
                pregunta,
                respuesta_correcta,
                puntuacion
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        document.getElementById('new-question-form').reset();
        document.getElementById('question-id').value = '';
        loadQuestions();
    } catch (error) {
        console.error('Error al añadir la pregunta:', error);
        document.getElementById('error').innerText = 'Error al añadir la pregunta. Inténtalo de nuevo más tarde.';
    }
}

document.addEventListener('DOMContentLoaded', loadQuestions);
document.getElementById('new-question-form').addEventListener('submit', addQuestion);