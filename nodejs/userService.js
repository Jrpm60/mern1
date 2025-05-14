
/**
 * Componente para mostrar datos de un usuario.
 * @component
 * @example
 * // Ejemplo de uso
 * <Greeting name="Juan" />
 * 
 * 
 * @param {string} userId - Identificador del usuario.
 * 
 * @returns {string} userName - Identificador del usuario.
 * 
 * @returns {string} userEmail - e-Mail del usuario.
 * 
 * @returns {string} userAdress - Direccion completa del usuario.
 * 
 * 
 */

const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) {
      throw new Error('Unable to fetch user data');
    }
    return response.json();
  } catch (error) {
    throw new Error('Unable to fetch user data');
  }
};

export const getUserName = async (userId) => {
  const userData = await fetchUserData(userId);
  return `${userData.username}`;
};

export const getUserEmail = async (userId) => {
    const userData = await fetchUserData(userId);
    return userData.email;
  };

export const getUserAdress = async (userId) => {
  const userData = await fetchUserData(userId);
  const { address } = userData;
  return `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`;
};
