import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, Typography, TextField, Button, Box,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';

function FormularioVotacion() {
  const [datosVotante, setDatosVotante] = useState({ email: '', pais: '' });
  const [identificado, setIdentificado] = useState(false);
  const [votos, setVotos] = useState({});
  const [actuaciones, setActuaciones] = useState([]);
  const [error, setError] = useState(null);
  const [verificando, setVerificando] = useState(false);
  const [emitidos, setEmitidos] = useState([]);

  // NUEVO: estados para el diálogo
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const [mensajeDialogo, setMensajeDialogo] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/eurovision/actuaciones')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setActuaciones(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error al obtener las actuaciones:', error);
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/eurovision/listavalidacion')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setEmitidos(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error al obtener los votantes que han votado:', error);
        setError(error.message);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDatosVotante({ ...datosVotante, [name]: value });
  };

  const handleVerificar = () => {
    setVerificando(true);

    const correo = datosVotante.email.trim().toLowerCase();

    const yaVotado = emitidos.some(
      (usuario) => usuario.email.trim().toLowerCase() === correo
    );

    if (yaVotado) {
      setMensajeDialogo('Este correo electrónico ya ha votado. Solo se permite un voto por usuario.');
      setMostrarDialogo(true);
      setVerificando(false);
      return;
    }

    setIdentificado(true);
    setVerificando(false);
  };

  const handleVotoChange = (actuacionId, event) => {
    const nuevoVoto = event.target.value;
    setVotos({ ...votos, [actuacionId]: nuevoVoto });
  };

  const handleEnviar = async (event) => {
    event.preventDefault();
    console.log('Votos emitidos:', votos);
    console.log('Datos del votante al enviar:', datosVotante);

    try {
      const response = await fetch('http://localhost:5000/api/v1/votar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          votante: datosVotante,
          votos: votos,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al enviar los votos: ${response.status} - ${errorData?.error || 'Error desconocido'}`);
      }

      const responseData = await response.json();
      console.log('Votos enviados con éxito:', responseData);

      setMensajeDialogo('¡Tus votos han sido enviados correctamente!');
      setMostrarDialogo(true);
      setVotos({});
    } catch (error) {
      console.error('Error al enviar los votos:', error);
      setError(error.message);
      setMensajeDialogo(`Error al enviar los votos: ${error.message}`);
      setMostrarDialogo(true);
    }
  };

  if (!actuaciones.length) {
    return <div>Cargando actuaciones...</div>;
  }

  if (!identificado) {
    return (
      <Box sx={{ maxWidth: 400, margin: '0 auto', mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 4 }}>
        <Typography variant="h6" gutterBottom>Identificación del Votante</Typography>
        <TextField
          fullWidth
          label="Correo Electrónico"
          id="email"
          name="email"
          value={datosVotante.email}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="País desde donde votas"
          id="pais"
          name="pais"
          value={datosVotante.pais}
          onChange={handleInputChange}
          margin="normal"
        />
        {verificando && <Typography color="textSecondary">Verificando...</Typography>}
        <Button variant="contained" onClick={handleVerificar} disabled={verificando} sx={{ mt: 2 }}>
          Verificar
        </Button>

        {/* DIÁLOGO PERSONALIZADO */}
        <Dialog open={mostrarDialogo} onClose={() => setMostrarDialogo(false)}>
          <DialogTitle>Atención</DialogTitle>
          <DialogContent>
            <Typography>{mensajeDialogo}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setMostrarDialogo(false)}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Eurovision 2025</Typography>
      <Typography variant="h5" gutterBottom>Correo Electrónico: {datosVotante.email}</Typography>
      <Typography variant="h5" gutterBottom>País desde donde votas: {datosVotante.pais}</Typography>
{/* Tarjetas de votacion */}
<Box
  component="form"
  onSubmit={handleEnviar}
  sx={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 2,
    mb: 2,
  }}
>
  {actuaciones.map((actuacion) => (
    <Card key={actuacion.id_actu} sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h6">{actuacion.id_pais}</Typography>
        <Typography variant="subtitle1">{actuacion.artista}</Typography>
        <Typography variant="body2">{actuacion.titulo}</Typography>
        <TextField
          type="number"
          label="Voto"
          value={votos[actuacion.id_actu] || ''}
          onChange={(event) => handleVotoChange(actuacion.id_actu, event)}
          InputProps={{ inputProps: { min: 1, max: 12, step: 1 } }}
          disabled={datosVotante.pais === actuacion.id_pais}
          fullWidth
          margin="normal"
        />
      </CardContent>
    </Card>
  ))}

  {/* Botón Enviar centrado y al final */}
  <Box sx={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', mt: 2 }}>
    <Button type="submit" variant="contained" color="primary">
      Enviar votos
    </Button>
  </Box>
</Box>

      {/* DIÁLOGO PERSONALIZADO */}
      <Dialog open={mostrarDialogo} onClose={() => setMostrarDialogo(false)}>
        <DialogTitle>Información</DialogTitle>
        <DialogContent>
          <Typography>{mensajeDialogo}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMostrarDialogo(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default FormularioVotacion;

