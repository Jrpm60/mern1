import React, { useState } from 'react';

const SmartDoor = () => {
  const [puertaSeleccionada, setPuertaSeleccionada] = useState('');
  const [numeroSocio, setNumeroSocio] = useState('');

  const handlePuertaChange = (event) => {
    setPuertaSeleccionada(event.target.value);
  };

  const handleNumeroSocioChange = (event) => {
    setNumeroSocio(event.target.value);
  };

  const handleVerificar = () => {
    console.log('Puerta Seleccionada:', puertaSeleccionada);
    console.log('Número de Socio:', numeroSocio);
    // Aquí deberías añadir la lógica para verificar si el número de socio
    // tiene permiso para acceder a la puerta seleccionada.
    // Por ejemplo, podrías hacer una petición a un servidor:
    // fetch(`/api/verificarAcceso?puerta=${puertaSeleccionada}&socio=${numeroSocio}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     if (data.puedeAcceder) {
    //       alert('Acceso concedido');
    //       // Aquí podrías abrir la puerta (si tienes un mecanismo para hacerlo)
    //     } else {
    //       alert('Acceso denegado');
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Error al verificar el acceso:', error);
    //     alert('Error al verificar el acceso');
    //   });
    alert(`Verificando acceso para la puerta ${puertaSeleccionada} y socio ${numeroSocio}`);
  };

  return (
    <>
          <h1>Smart Door</h1>
         
          <div className="card">
            <button>
              Informes
            </button>
          </div>

          <p className="read-the-docs">
            Gestión inteligente de presencia
          </p>

      <div className="card">
        <button>
          Puerta de acceso
        </button>
        <select value={puertaSeleccionada} onChange={handlePuertaChange}>
          <option value="A">Puerta A</option>
          <option value="B">Puerta B</option>
          <option value="C">Puerta C</option>
        </select>
      </div>

      <div className="card">
        <button>
          Introduzca su nº socio:
        </button>
        <input
          type="text"
          id="numeroSocioInput"
          value={numeroSocio}
          onChange={handleNumeroSocioChange}
        />
      </div>

      <div className="card">
        <button onClick={handleVerificar}>
          ENTRAR
        </button>
      </div>
    </>
  );
};

export default SmartDoor;