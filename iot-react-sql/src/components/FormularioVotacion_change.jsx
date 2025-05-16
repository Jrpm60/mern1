import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';

function FormularioVotacion() {
  const [votos, setVotos] = useState({});
  const [actuaciones, setActuaciones] = useState([]);
  const [error, setError] = useState(null);

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

  const handleVotoChange = (actuacionId, event) => {
    const nuevoVoto = event.target.value;
    setVotos({ ...votos, [actuacionId]: nuevoVoto });
  };

 const handleEnviar = async (event) => {
  event.preventDefault();
  console.log('Votos emitidos:', votos);
  

  try {
   const response = await fetch('http://localhost:5000/api/v1/votar', { // Define una ruta para enviar los votos
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({

     votos: votos,
    }),
   });

   if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error al enviar los votos: ${response.status} - ${errorData?.error || 'Error desconocido'}`);
   }

   const responseData = await response.json();
   console.log('Votos enviados con éxito:', responseData);
   // Aquí  mostrar un mensaje de éxito al usuario
   alert('¡Tus votos han sido enviados!');
   // resetear el estado de los votos
   setVotos({});
  } catch (error) {
   console.error('Error al enviar los votos:', error);
   setError(error.message);
   // Aquí  mostrar un mensaje de error al usuario
   alert(`Error al enviar los votos: ${error.message}`);
  }
 };

  if (!actuaciones.length) {
    return <div>Cargando actuaciones...</div>;
  }

  return (
    <Box sx={{ mt: 4 }}>
 
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

