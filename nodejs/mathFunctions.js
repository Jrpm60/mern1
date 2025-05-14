/**
 * Suma dos números.
 * @param {number} a - El primer número a sumar.
 * @param {number} b - El segundo número a sumar.
 * @returns {number} El resultado de la suma de a y b.
 */
export function sumar(a, b) {
    return a + b;
  }
  
  /**
   * Divide dos números.
   * @param {number} a - El numerador.
   * @param {number} b - El denominador.
   * @returns {number} El resultado de la división de a entre b.
   * @throws {Error} Lanza un error si el denominador es cero.
   */
export function dividir(a, b) {
    if (b === 0) {
      throw new Error('No se puede dividir entre cero');
    }
    return a / b;
  }
  