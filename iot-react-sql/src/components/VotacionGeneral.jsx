import React, { useState } from 'react';
import IdentificacionVotante from './IdentificacionVotante';
import FormularioVotacion from './FormularioVotacion';
import MensajeConfirmacion from './MensajeConfirmacion';

function VotacionGeneral() {
  const [votanteIdentificado, setVotanteIdentificado] = useState(false);
  const [datosVotante, setDatosVotante] = useState(null);
  const [haVotado, setHaVotado] = useState(false); // Por ahora, simulado
  const [votosEnviados, setVotosEnviados] = useState(false);

  const handleIdentificarVotante = (email, pais) => {
    console.log('Intentando identificar a:', email, 'del país:', pais);
    // Aquí iría la lógica para comunicarse con el backend
    // y verificar si el votante existe y no ha votado previamente.
    // Por ahora, simularemos una identificación exitosa.
    setDatosVotante({ email, pais });
    setVotanteIdentificado(true);
    // En un caso real, aquí también se verificaría si ya ha votado.
    // Si ya votó, se podría establecer setHaVotado(true);
  };

  const handleEnviarVotos = (votos) => {
    console.log('Votos enviados:', votos);
    // Aquí iría la lógica para enviar los votos al backend
    // y guardar en la base de datos.
    // Por ahora, simulamos el envío exitoso.
    setVotosEnviados(true);
  };

  const handleVolverAIdentificar = () => {
    setVotanteIdentificado(false);
    setDatosVotante(null);
    setHaVotado(false);
    setVotosEnviados(false);
  };

  let contenido;

  if (!votanteIdentificado) {
    contenido = <IdentificacionVotante onIdentificar={handleIdentificarVotante} />;
  } else if (haVotado) {
    contenido = (
      <div>
        <h2>Ya has emitido tu voto.</h2>
        <button onClick={handleVolverAIdentificar}>Volver a identificar</button>
      </div>
    );
  } else if (votosEnviados) {
    contenido = <MensajeConfirmacion />;
  } else {
    contenido = <FormularioVotacion datosVotante={datosVotante} onEnviarVotos={handleEnviarVotos} />;
  }

  return (
    <div className="votacion-general">
      {contenido}
    </div>
  );
}

export default VotacionGeneral;