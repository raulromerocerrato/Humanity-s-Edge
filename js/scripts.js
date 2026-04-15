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

function afegirComentari(e) {
    e.preventDefault();

    const formulari = document.querySelector('.formulariComentari');

    const dades = {
        api_token: 'pHJNhm719MN5LCVqE839lOse0qvlbL1lBXndZmAWoJfiPXZFQHmgNQrzUHYS',
        nombre: document.getElementById('nom').value,
        mensaje: document.getElementById('missatge').value
    };

    fetch('https://phpstack-1076337-5399863.cloudwaysapps.com/api/comments', {
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

const url = "https://phpstack-1076337-5399863.cloudwaysapps.com/";
const token = "pHJNhm719MN5LCVqE839lOse0qvlbL1lBXndZmAWoJfiPXZFQHmgNQrzUHYS";

const tiempoActualizacion = 5000;

async function cargarPuntuaciones() {
    try {
        const resposta = await fetch("https://phpstack-1076337-5399863.cloudwaysapps.com/api/classification/pHJNhm719MN5LCVqE839lOse0qvlbL1lBXndZmAWoJfiPXZFQHmgNQrzUHYS/10");
        const datos = await resposta.json();

        if (!resposta.ok) {
            console.log("Error en la respuesta");
            mostrarError();
            return;
        }

        let jugadores = datos.data;

        jugadores.sort(function(a, b) {
            return b.puntuacion - a.puntuacion;
        });

        mostrarTabla(jugadores);

    } catch (error) {
        console.log("Ha ocurrido un error:", error);
        mostrarError();
    }
}

function mostrarTabla(lista) {
    const tabla = document.querySelector(".taula");
    const cabecera = tabla.querySelector(".contingut");

    tabla.innerHTML = "";
    tabla.appendChild(cabecera);

    for (let i = 0; i < lista.length; i++) {
        const jugador = lista[i];
        const posicion = i + 1;

        const fila = document.createElement("li");
        fila.classList.add("usuaris");

        if (posicion <= 3) {
            fila.classList.add("posicio-" + posicion);
        }

        fila.innerHTML = `
            <p class="elementUsuari">${posicion}</p>
            <p class="elementDobleUsuari">${jugador.name}</p>
            <p class="elementUsuari">${jugador.puntuacion}</p>
        `;

        tabla.appendChild(fila);
    }
}

function mostrarError() {
    const tabla = document.querySelector(".taula");
    const cabecera = tabla.querySelector(".contingut");

    tabla.innerHTML = "";
    tabla.appendChild(cabecera);

    const fila = document.createElement("li");
    fila.classList.add("usuaris");

    fila.innerHTML = `
        <p class="elementDobleUsuari" style="grid-column: span 4; color: red;">
            Error al cargar los datos
        </p>
    `;

    tabla.appendChild(fila);
}

document.addEventListener("DOMContentLoaded", function() {
    cargarPuntuaciones();
    setInterval(cargarPuntuaciones, tiempoActualizacion);
});



// Cambiar modo colores
document.addEventListener('DOMContentLoaded', () => {
    const botonModo = document.querySelector('.botonCambiarModoClaro');

    if (localStorage.getItem('modo') === 'light') {
        document.body.classList.add('light');
        botonModo.textContent = '🌙';
    } else {
        botonModo.textContent = '☀️';
    }

    botonModo.addEventListener('click', () => {
        document.body.classList.toggle('light');
        const esModoClaro = document.body.classList.contains('light');
        botonModo.textContent = esModoClaro ? '🌙' : '☀️';
        localStorage.setItem('modo', esModoClaro ? 'light' : 'dark');
    });
});