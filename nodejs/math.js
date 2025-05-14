function sumar(a, b) {
    return a + b;
  }
  
function dividir(a, b) {
    if (b === 0) {
      throw new Error('No se puede dividir entre cero');
    }
    return a / b;
  }

function restar(x, y) {
    return x-y ;
  }

function redondear(z) {
    return `$${z.toFixed(2)}` ;
  }

function convertirDuracion(duracion, deUnidad, aUnidad) {
    if (deUnidad=="segundos" && aUnidad=="minutos")
        return duracion/60

    if (deUnidad=="segundos" && aUnidad=="segundos")
        return duracion

    if (deUnidad=="minutos" && aUnidad=="segundos")
        return duracion * 60

    }

  
  
module.exports = { sumar, dividir, restar, redondear, convertirDuracion };