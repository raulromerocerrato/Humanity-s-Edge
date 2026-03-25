function redireccioPagina(pagina) {
    
    switch (pagina) {
        case 'jugar':
            window.location.href = 'pagina del joc';
            break;
        case 'controls':
            window.location.href = '../Controls/index.html';
            break;
        case 'puntuacio':
            window.location.href = '../Puntuacio/index.html';
            break;
        default:
            console.error('Pàgina no reconeguda: ' + pagina);
    }
}

function navPagina(nomPagina){
    switch(nomPagina){
        case "Historia":
            window.location.href="https://raulromerocerrato.github.io/Humanity-s-Edge/Historia/index.html";
            break;
        case "Jugar":
            window.location.href="https://raulromerocerrato.github.io/Humanity-s-Edge/Jugar/index.html";
            break;
        case "Controls":
            window.location.href="https://raulromerocerrato.github.io/Humanity-s-Edge/Controls/index.html";
            break;
        case "Puntuacio":
            window.location.href="https://raulromerocerrato.github.io/Humanity-s-Edge/Puntuacio/index.html";
            break;
        case "Nosaltres":  
            window.location.href="https://raulromerocerrato.github.io/Humanity-s-Edge/Nosaltres/index.html";
            break;
        case "Contacte":
            window.location.href="https://raulromerocerrato.github.io/Humanity-s-Edge/Contacte/index.html";
            break;
    }
}

function afegirMissatge(e) {
    e.preventDefault();

    const formulari = document.querySelector('.formulariContacte');

    const dades = {
        api_token: 'pHJNhm719MN5LCVqE839lOse0qvlbL1lBXndZmAWoJfiPXZFQHmgNQrzUHYS',
        nombre: document.getElementById('nom').value,
        email: document.getElementById('email').value,
        asunto: document.getElementById('asunto')?.value || 'Contacte web',
        mensaje: document.getElementById('missatge').value
    };

    fetch('https://phpstack-1076337-5399863.cloudwaysapps.com/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dades)
    })
    .then(resposta => {
        if (resposta.ok) {
            alert('Missatge enviat correctament!');
            formulari.reset();
        } else {
            return resposta.json().then(err => {
                throw new Error(err.message || 'Error al servidor');
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('No s\'ha pogut enviar el missatge: ' + error.message);
    });
}

function mostrarBarraNavegacio() {
    const barra = document.querySelector('.barraNavegacio');
    
    if (barra.style.display === 'flex') {
        barra.style.display = 'none';
    } else {
        barra.style.display = 'flex';
        barra.style.flexDirection = 'column';
        barra.style.position = 'absolute';
        barra.style.background = 'var(--color-fondo-oscuro)';
        barra.style.top = '60px';
        barra.style.left = '0';
        barra.style.width = '100%';
        barra.style.textAlign = 'center';
    }
}


// pagina puntuació 

const url ="https://phpstack-1076337-5399863.cloudwaysapps.com/";
const ApiToken ="pHJNhm719MN5LCVqE839lOse0qvlbL1lBXndZmAWoJfiPXZFQHmgNQrzUHYS";

const tempsActualizacio = 5000;

const MEDALLES = {
    1: "🥇",
    2: "🥈",
    3: "🥉"
};

async function carregarPuntuacions() {
    try {

        const resposta = await fetch("https://phpstack-1076337-5399863.cloudwaysapps.com/api/classification/pHJNhm719MN5LCVqE839lOse0qvlbL1lBXndZmAWoJfiPXZFQHmgNQrzUHYS");

        if (!resposta.ok) {
            throw new Error(`Error HTTP: ${resposta.status}`);
        }

        const respJson = await resposta.json();
        const dades = respJson.data;

        dades.sort((a, b) => b.puntuacion - a.puntuacion);

        actualitzarTaula(dades);

    } catch (error) {
        console.error("Error en carregar les puntuacions:", error);
        mostrarError();
    }
}

function actualitzarTaula(jugadors) {
    const taula = document.querySelector(".taula");

    const capcalera = taula.querySelector(".contingut");
    taula.innerHTML = "";
    taula.appendChild(capcalera);

    jugadors.forEach((jugador, index) => {
        const posicio = index + 1;
        const medalla = MEDALLES[posicio] || "";

        const fila = document.createElement("li");
        fila.classList.add("usuaris");

        if (posicio <= 3) {
            fila.classList.add(`posicio-${posicio}`);
        }

        fila.innerHTML = `
            <p class="elementUsuari">${medalla} ${posicio}</p>
            <p class="elementDobleUsuari">${jugador.name}</p>
            <p class="elementUsuari">${jugador.puntuacion}</p>
        `;

        taula.appendChild(fila);
    });
}

function mostrarError() {
    const taula = document.querySelector(".taula");
    const capcalera = taula.querySelector(".contingut");
    taula.innerHTML = "";
    taula.appendChild(capcalera);

    const filaError = document.createElement("li");
    filaError.classList.add("usuaris");
    filaError.innerHTML = `
        <p class="elementDobleUsuari" style="grid-column: span 4; color: red;">
            Error en carregar les puntuacions. Torna-ho a intentar.
        </p>
    `;
    taula.appendChild(filaError);
}

document.addEventListener("DOMContentLoaded", () => {
    carregarPuntuacions();
    setInterval(carregarPuntuacions, tempsActualizacio);
});
