
function redireccioPagina(pagina) {
    
    switch (pagina) {
        case 'jugar':
            window.location.href = 'pagina del joc';
            break;
        case 'controls':
            window.location.href = '../Controls/index.html';
            break;
        default:
            console.error('Pàgina no reconeguda: ' + pagina);
    }
}