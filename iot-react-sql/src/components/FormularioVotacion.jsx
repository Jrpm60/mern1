import React, { useState, useEffect } from 'react';

function FormularioVotacion({ datosVotante, onEnviarVotos }) {
  const [votos, setVotos] = useState({});
  const [actuaciones, setActuaciones] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActuaciones = async () => {
      setLoading(true);
      setError(null);
      try {
        // Reemplaza 'http://tu-api.com/actuaciones' con la URL de tu API
        const response = await fetch('http://tu-api.com/actuaciones');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setActuaciones(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActuaciones();
  }, []); // El array vacío asegura que esto se ejecute solo una vez al montar el componente

  const handleVotoChange = (actuacionId, event) => {
    const nuevoVoto = event.target.value;
    setVotos({ ...votos, [actuacionId]: nuevoVoto });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí iría la lógica para validar que se hayan emitido todos los votos necesarios
    if (onEnviarVotos) {
      onEnviarVotos(votos);
    } else {
      console.warn('No se proporcionó la función onEnviarVotos al componente FormularioVotacion.');
    }
  };

  if (loading) {
    return <div>Cargando las actuaciones...</div>;
  }

  if (error) {
    return <div>Error al cargar las actuaciones: {error}</div>;
  }

  return (
    <div className="formulario-votacion">
      <h2>¡A votar!</h2>
      <p>País desde donde votas: {datosVotante?.pais}</p>
      <form onSubmit={handleSubmit}>
        <ul className="lista-actuaciones">
          {actuaciones.map((actuacion) => (
            <li key={actuacion.id_actu} className="actuacion">
              <div className="info-actuacion">
                <strong>{actuacion.id_pais}</strong> - {actuacion.artista} - "{actuacion.titulo}"
              </div>
              <div className="campo-voto">
                <label htmlFor={`voto-${actuacion.id_actu}`}>Voto:</label>
                <input
                  type="number"
                  id={`voto-${actuacion.id_actu}`}
                  name={`voto-${actuacion.id_actu}`}
                  min="1"
                  max="12"
                  step="1"
                  onChange={(event) => handleVotoChange(actuacion.id_actu, event)}
                  disabled={datosVotante?.pais === actuacion.id_pais}
                />
              </div>
            </li>
          ))}
        </ul>
        <button type="submit">Enviar Votos</button>
      </form>
    </div>
  );
}

export default FormularioVotacion;