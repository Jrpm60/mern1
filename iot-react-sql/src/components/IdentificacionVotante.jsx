import React, { useState } from 'react';

function IdentificacionVotante({ onIdentificar }) {
  const [email, setEmail] = useState('');
  const [pais, setPais] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePaisChange = (event) => {
    setPais(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí llamaremos a la función que gestionará la identificación
    // y la verificación en la base de datos.
    // Por ahora, simplemente pasamos los datos al componente padre.
    if (onIdentificar) {
      onIdentificar(email, pais);
    } else {
      console.warn('No se proporcionó la función onIdentificar al componente IdentificacionVotante.');
    }
    // Podríamos añadir lógica para limpiar los campos después del envío si es necesario
    // setEmail('');
    // setPais('');
  };

  return (
    <div className="identificacion-votante">
      <h2>Identificación del Votante</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pais">País desde donde vota:</label>
          <input
            type="text"
            id="pais"
            value={pais}
            onChange={handlePaisChange}
            required
          />
        </div>
        <button type="submit">Identificar</button>
      </form>
      {/* Aquí podríamos añadir un enlace para el registro de nuevos votantes */}
      <p>¿No estás registrado? <a href="#">Regístrate aquí</a></p>
    </div>
  );
}

export default IdentificacionVotante;