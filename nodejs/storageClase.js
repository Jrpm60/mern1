/**
 * Almacenar en LocalStorage.
 * @param {number} clave - La clave que identifica el valor.
 * @param {any} valor - El valor a almacenar.
 */

export function almacenarEnLocalStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
  }