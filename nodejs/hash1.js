// Actividad - completar las partes que falta, para regsitrar un usuario y login 

import bcrypt from 'bcrypt';

const users = {};  // In-memory "database"

const registerUser = async (username, plainPassword) => {
  const saltRounds = 10;

  // TO DO: conseguir una contraseña hashed

  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

  users[username] = hashedPassword;  // guardar la contraseña hashed en el objeto de usuarios
  console.log(`User registrado "${username}"`);
};

const loginUser = async (username, inputPassword) => {
  const hashedPassword = users[username];
  
  if (!hashedPassword) {
    console.log('User not found');
    return false;
  }

  // TO DO: Comparar la contraseña (inputPassword) con la contraseña guardado en el objeto de usuarios (hashedPassword)

  
  
  const isMatch = await bcrypt.compare(inputPassword, hashedPassword);

  // TO DO: Devolver true o false, dependiendo del resultado

  if (isMatch) {
    console.log('Login successful');
    return true;
  } else {
    console.log('Incorrect password');
    return false;
  }
};

// --- MAIN ---

const username = 'alice';
const password = 'secret123';

await registerUser(username, password);          // Save hashed password
await loginUser(username, 'wrongpass');          // Should fail
await loginUser(username, 'secret123');          // Should succeed
