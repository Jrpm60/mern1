import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Typography, TextField, Button, Box,
  Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert
} from '@mui/material';

function FormularioVotacion() {
  const [datosVotante, setDatosVotante] = useState({ email: '', pais: '' });
  const [identificado, setIdentificado] = useState(false);
  const [votos, setVotos] = useState({});
  const [actuaciones, setActuaciones] = useState([]);
  const [error, setError] = useState(null);
  const [verificando, setVerificando] = useState(false);
  const [emitidos, setEmitidos] = useState([]);
  const [mostrarDialogo, setMostrarDialogo] = useState(false);
  const [mensajeDialogo, setMensajeDialogo] = useState('');
  const [votosValidos, setVotosValidos] = useState(0);
  const [erroresVoto, setErroresVoto] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });



  const mitad = Math.ceil(actuaciones.length / 2);
  const izquierda = actuaciones.slice(0, mitad);
  const derecha = actuaciones.slice(mitad);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/eurovision/actuaciones')
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => setActuaciones(data))
      .catch(error => setError(error.message));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/eurovision/listavalidacion')
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => setEmitidos(data))
      .catch(error => setError(error.message));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDatosVotante({ ...datosVotante, [name]: value });
  };


  useEffect(() => {
  const votosNumericos = Object.values(votos)
    .filter(v => v !== '' && v !== null)
    .map(Number);

  const contiene11 = votosNumericos.includes(11);
  const hayRepetidos = votosNumericos.length !== new Set(votosNumericos).size;
  const totalVotos = votosNumericos.length;

  // Si hay 11 votos, todos distintos y sin un 11, es válido
  if (!contiene11 && !hayRepetidos && totalVotos === 11) {
    setVotosValidos(11);
  } else {
    setVotosValidos(-1);  // -1 para indicar que no es válido
  }
}, [votos]);


  const handleVerificar = () => {
    setVerificando(true);
    const correo = datosVotante.email.trim().toLowerCase();
    const yaVotado = emitidos.some(usuario => usuario.email.trim().toLowerCase() === correo);

    if (yaVotado) {
      setMensajeDialogo('Este correo electrónico ya ha votado. Solo se permite un voto por usuario.');
      setMostrarDialogo(true);
      setVerificando(false);
      return;
    }

    setIdentificado(true);
    setVerificando(false);
  };

const handleVotoChange = (id, event) => {
  const nuevoVoto = Number(event.target.value);

  // Si está vacío, simplemente se borra
  if (event.target.value === '') {
    const nuevosVotos = { ...votos };
    delete nuevosVotos[id];
    setVotos(nuevosVotos);
    return;
  }

  // Validaciones
  if (nuevoVoto < 1 || nuevoVoto > 12) {
    mostrarAdvertencia('El voto debe estar entre 1 y 12.');
    return;
  }

  if (nuevoVoto === 11) {
    mostrarAdvertencia('No se puede asignar la puntuación 11.');
    return;
  }

  const votosExistentes = Object.entries(votos)
    .filter(([key]) => Number(key) !== id)
    .map(([_, value]) => Number(value));

  if (votosExistentes.includes(nuevoVoto)) {
    mostrarAdvertencia(`La puntuación ${nuevoVoto} ya ha sido utilizada.`);
    return;
  }

  setVotos({ ...votos, [id]: nuevoVoto });
};

const validarVoto = (nuevoVoto, idActual) => {
  const valor = Number(nuevoVoto);

  if (!valor || isNaN(valor)) return { error: false };

  if (valor < 1 || valor > 12) return { error: true, mensaje: "El voto debe estar entre 1 y 12" };
  if (valor === 11) return { error: true, mensaje: "No se permite el voto 11" };

  const valoresUsados = Object.entries(votos)
    .filter(([id, _]) => id !== idActual.toString()) // ignoramos el actual
    .map(([_, v]) => Number(v));

  if (valoresUsados.includes(valor)) {
    return { error: true, mensaje: `El valor ${valor} ya ha sido usado` };
  }

  return { error: false };
};


const mostrarAdvertencia = (mensaje) => {
  setSnackbar({ open: true, message: mensaje });
};

const handleCerrarSnackbar = () => {
  setSnackbar({ open: false, message: '' });
};


const handleEnviar = async (event) => {
  event.preventDefault();

  // Construimos el array de votos a partir del objeto
  const votosArray = Object.entries(votos)
    .filter(([_, voto]) => voto !== '' && voto !== null)
    .map(([id_actu, voto]) => ({
      id_actu: Number(id_actu),
      voto: Number(voto)
    }));

  const payload = {
    email: datosVotante.email.trim().toLowerCase(),
    pais: datosVotante.pais.trim().toUpperCase(),
    votos: votosArray,
  };

  console.log('Payload a enviar:', payload);

  try {
    const response = await fetch('http://localhost:5000/api/v1/eurovision/votar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error al enviar los votos: ${response.status} - ${errorData?.error || 'Error desconocido'}`);
    }

    const responseData = await response.json();
    console.log('Votos enviados con éxito:', responseData);

    setMensajeDialogo('¡Tus votos han sido enviados correctamente!');
    setMostrarDialogo(true);
    setVotos({});  // Limpiamos votos
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


        <TextField
          fullWidth
          label="Correo Electrónico"
          id="email"
          name="email"
          value={datosVotante.email}
          onChange={handleInputChange}
          margin="normal"
          error={datosVotante.email !== '' && (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(datosVotante.email) || emitidos.some(usuario => usuario.email.trim().toLowerCase() === datosVotante.email.trim().toLowerCase()))}
          helperText={
            datosVotante.email === ''
              ? ''
              : !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(datosVotante.email)
              ? 'Correo electrónico inválido.'
              : emitidos.some(usuario => usuario.email.trim().toLowerCase() === datosVotante.email.trim().toLowerCase())
              ? 'Este correo ya ha votado.'
              : 'Correo válido.'
          }
        />

        <TextField
          fullWidth
          label="País desde donde votas"
          id="pais"
          name="pais"
          value={datosVotante.pais}
          onChange={handleInputChange}
          margin="normal"
          error={datosVotante.pais !== '' && datosVotante.pais.trim().length < 2}
          helperText={
            datosVotante.pais === ''
              ? ''
              : datosVotante.pais.trim().length < 2
              ? 'Introduce un nombre de país válido.'
              : 'País válido.'
          }
        />


        {verificando && <Typography color="textSecondary">Verificando...</Typography>}
        <Button variant="contained" onClick={handleVerificar} disabled={verificando} sx={{ mt: 2 }}>
          Verificar
        </Button>

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
      <Typography variant="h6">Correo Electrónico: {datosVotante.email}</Typography>
      <Typography variant="h6">País desde donde votas: {datosVotante.pais}</Typography>
<Typography variant="h6" sx={{ color: votosValidos === 11 ? 'green' : 'red' }}>
  {votosValidos === 11
    ? 'Has emitido correctamente los 11 votos (sin repetir puntuaciones ni usar el 11).'
    : 'Vota a 11 candidatos, votos unicos de 1 al 12'}
</Typography>

      <Box
        component="form"
        onSubmit={handleEnviar}
        sx={{ display: 'flex', justifyContent: 'space-between', gap: 4, mt: 3 }}
      >
        {/* Columna izquierda */}
        <Table sx={{ width: '48%' }} size="small" aria-label="actuaciones izquierda">
          <TableHead>
            <TableRow>
              <TableCell>País</TableCell>
              <TableCell>Artista</TableCell>
              <TableCell>Canción</TableCell>
              <TableCell>Voto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {izquierda.map(actuacion => (
              <TableRow key={actuacion.id_actu}>
                <TableCell>{actuacion.id_pais}</TableCell>
                <TableCell>{actuacion.artista}</TableCell>
                <TableCell>{actuacion.titulo}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    size="small"
                    value={votos[actuacion.id_actu] || ''}
                    onChange={(e) => handleVotoChange(actuacion.id_actu, e)}
                    disabled={datosVotante.pais === actuacion.id_pais}
                    error={erroresVoto[actuacion.id_actu]?.error || false}
                    helperText={erroresVoto[actuacion.id_actu]?.mensaje || ''}
                    InputProps={{ inputProps: { min: 1, max: 12, step: 1 } }}
                    sx={{ width: 80 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Columna derecha */}
        <Table sx={{ width: '48%' }} size="small" aria-label="actuaciones derecha">
          <TableHead>
            <TableRow>
              <TableCell>País</TableCell>
              <TableCell>Artista</TableCell>
              <TableCell>Canción</TableCell>
              <TableCell>Voto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {derecha.map(actuacion => (
              <TableRow key={actuacion.id_actu}>
                <TableCell>{actuacion.id_pais}</TableCell>
                <TableCell>{actuacion.artista}</TableCell>
                <TableCell>{actuacion.titulo}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    size="small"
                    value={votos[actuacion.id_actu] || ''}
                    onChange={(e) => handleVotoChange(actuacion.id_actu, e)}
                    disabled={datosVotante.pais === actuacion.id_pais}
                    error={erroresVoto[actuacion.id_actu]?.error || false}
                    helperText={erroresVoto[actuacion.id_actu]?.mensaje || ''}
                    InputProps={{ inputProps: { min: 1, max: 12, step: 1 } }}
                    sx={{ width: 80 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      

      <Box sx={{ mt: 3, textAlign: 'center' }}>

        <Button
          variant="contained"
          onClick={handleVerificar}
          disabled={
            verificando ||
            !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(datosVotante.email) ||
            emitidos.some(usuario => usuario.email.trim().toLowerCase() === datosVotante.email.trim().toLowerCase()) ||
            datosVotante.pais.trim().length < 2
          }
          sx={{ mt: 2 }}
        >
          Verificar
        </Button>
        
      </Box>
      </Box>

      <Dialog open={mostrarDialogo} onClose={() => setMostrarDialogo(false)}>
        <DialogTitle>Información</DialogTitle>
        <DialogContent>
          <Typography>{mensajeDialogo}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMostrarDialogo(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>

          <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={handleCerrarSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={handleCerrarSnackbar}
        severity="warning"
        sx={{ width: '100%' }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>

    </Box>
  );
}

export default FormularioVotacion;

