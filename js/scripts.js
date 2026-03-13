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
            window.location.href='../Historia/index.html';
            break;
        case "Jugar":
            window.location.href='../Jugar/index.html';
            break;
        case "Controls":
            window.location.href='../Controls/index.html';
            break;
        case "Puntuacio":
            window.location.href='../Puntuacio/index.html';
            break;
        case "Nosaltres":  
            window.location.href='../Nosaltres/index.html';
            break;
        case "Contacte":
            window.location.href='../Contacte/index.html';
            break;
    }
}