import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';

function FormularioVotacion() {
  const [datosVotante, setDatosVotante] = useState({ email: '', pais: '' });
  const [identificado, setIdentificado] = useState(false);
  const [votos, setVotos] = useState({});
  const [actuaciones, setActuaciones] = useState([]);
  const [error, setError] = useState(null);
  const [verificando, setVerificando] = useState(false); 

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/eurovision')
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDatosVotante({ ...datosVotante, [name]: value });
  };

  const handleVerificar = () => {
    console.log('Simulando verificación:', datosVotante);
    setVerificando(true);
    setTimeout(() => {
      setIdentificado(true);
      setVerificando(false);
    }, 1000);
  };

  const handleVotoChange = (actuacionId, event) => {
    const nuevoVoto = event.target.value;
    setVotos({ ...votos, [actuacionId]: nuevoVoto });
  };

  const handleEnviar = (event) => {
    event.preventDefault();
    console.log('Votos emitidos:', votos);
    console.log('Datos del votante al enviar:', datosVotante);
    // Aquí iría la lógica para enviar los votos al servidor
  };

  if (error) {
    return <div>Error al cargar las actuaciones: {error}</div>;
  }

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
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Eurovision 2025</Typography>
      <Typography variant="h5" gutterBottom>Correo Electrónico: {datosVotante.email}</Typography>
      <Typography variant="h5" gutterBottom>País desde donde votas: {datosVotante.pais}</Typography>
      <Box component="form" onSubmit={handleEnviar} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        {actuaciones.map((actuacion) => (
          <Card key={actuacion.id_actu} sx={{ width: 'calc(10% - 16px)', minWidth: 200 }}>
            <CardContent>
              <Typography variant="h" component="div">
                {actuacion.id_pais}
              </Typography>
              <Typography variant="h">
                {actuacion.artista} <p/>
              </Typography>
              <Typography variant="h" color="text.secondary">
                {actuacion.titulo} <p/>
              </Typography>
              <TextField
                type="number"
                id={`voto-${actuacion.id_actu}`}
                name={`voto-${actuacion.id_actu}`}
                label="Voto"
                slotProps={{ input: {min: 1, max: 12, step: 1} }}
                onChange={(event) => handleVotoChange(actuacion.id_actu, event)}
                disabled={datosVotante.pais === actuacion.id_pais}
                fullWidth
                margin="normal"
              />
            </CardContent>
          </Card>
        ))}
        <Button  type="submit" variant="contained" sx={{ mt: 2 }}>
          Enviar Votos
        </Button>
      </Box>
    </Box>
  );
}

export default FormularioVotacion;

