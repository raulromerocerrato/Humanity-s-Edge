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