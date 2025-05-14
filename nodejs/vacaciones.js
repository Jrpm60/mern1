
function describirVacaiones(destino, dias, actividad) { 
    console.log(`Yo fui a ${destino} durante ${dias} dias y la actividad mas divertida fue ${actividad}`)
}

describirVacaiones (`hawaii`, 10, `hacer surf`);
describirVacaiones (`sevilla`, 5, `ver la procesion`);
describirVacaiones (`cordoba`, 7, `hacer visitar la mezquita`);

//=====================================================================

function proximoVerano(arrDestinos) { 
    
    arrDestinos.forEach(element => {
        console.log(`Yo viajare a ${element} en verano!`)
        
    });    

}

const destinos = ["Portugal", "Australia", "Peru", "Italia"];
proximoVerano(destinos);

//=====================================================================