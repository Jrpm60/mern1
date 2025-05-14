function MiNombre() {
    return "Maria Fernandez";
}

function MiNombre2() {
    const arrNombres = ['Maria', 'Jon', 'Juan'];
    return arrNombres;
  } 

function getSaldo() {
    return 500;

}

function tieneSuficientesaldo(saldo, minimo) {
    if (saldo>=minimo) {
        return true;
    }
    else {
        return false;        
    }

}

module.exports = { MiNombre, MiNombre2, getSaldo, tieneSuficientesaldo };