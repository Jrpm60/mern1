import React, { useState, useEffect } from 'react';

function TuComponente() {
  const [actuaciones, setActuaciones] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setCargando(true);
    fetch('/api/actuaciones') // Ajusta la ruta si es necesario
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setActuaciones(data);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error al obtener las actuaciones:', error);
        setError(error.message);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <div>Cargando actuaciones...</div>;
  }

  if (error) {
    return <div>Error al cargar las actuaciones: {error}</div>;
  }

  // Aquí puedes usar el estado 'actuaciones' para renderizar tus datos
  // Por ejemplo:
  // return (
  //   <div>
  //     {actuaciones.map(actuacion => (
  //       <div key={actuacion.id_actu}>
  //         {actuacion.artista} - {actuacion.titulo}
  //       </div>
  //     ))}
  //   </div>
  // );

  return null; // Devuelve null o lo que necesites mientras implementas la renderización
}

export default TuComponente;