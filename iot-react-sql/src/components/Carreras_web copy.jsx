import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import ViajeCard from './ViajeCard';

const Carreras_web = () => {
  const [formData, setFormData] = useState({origen: '', destino: '', fecha: '', hora: '', estado: '', precio: '', });
  const [carreras, setCarreras] = useState([]);
  const ID_USUARIO = "000000000000000000000001"; // ID del usuario

// ============= FETCH PARA GET ==========================================
  const fetchCarreras = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/carreras/${ID_USUARIO}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data && data.length > 0 && data[0].viajes) {
        setCarreras(data[0].viajes);
      } else {
        setCarreras([]);
      }
    } catch (error) {
      console.error("Error fetching carreras:", error);
      // Opcional: mostrar un mensaje al usuario
    }
  };

  useEffect(() => {
    fetchCarreras();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

// ============= FETCH PARA POST ==========================================

  const handleGuardarDatos = async () => {
    try {
      const fechaHoraISO = `${formData.fecha}T${formData.hora}:00.000Z`;
      const newTripIdString = new Date().getTime().toString();
      
      const nuevoViaje = {
        id_viaje: { "$oid": newTripIdString },
        lugar_recogida: formData.origen,
        lugar_destino: formData.destino,
        estado: formData.estado,
        costo: formData.precio,
        fecha_hora: { "$date": fechaHoraISO }, 
      };

      const response = await fetch('http://localhost:5000/api/v1/carreras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoViaje), // Enviamos el objeto 'nuevoViaje' ya correctamente estructurado
      });

      if (!response.ok) {
        throw new Error(`Error HTTP! Estado: ${response.status}`);
      }

      const data = await response.json();
      console.log('Viaje agregado:', data);
      alert('Viaje reservado exitosamente!');

      // --- CAMBIO APLICADO AQUÍ ---
      // Como 'nuevoViaje' ya está en el formato correcto (incluyendo $oid y $date),
      // lo añadimos directamente al estado 'carreras'.
      // Esto hace que el nuevo viaje aparezca inmediatamente en la lista.
      setCarreras((prevCarreras) => [...prevCarreras, nuevoViaje]); 
      
      setFormData({ origen: '', destino: '', fecha: '', hora: '', estado: '', precio: '' });

    } catch (error) {
      console.error('Error al guardar el viaje:', error);
      alert('Hubo un problema al reservar el viaje.');
    }
  };

// ============= FETCH PARA PUT (actualizacion Estado) ==========================================

const handleUpdateEstadoViaje = async (idViaje, nuevoEstado) => {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/carreras/viaje/${ID_USUARIO}/${idViaje}`, {
      method: 'PUT', // Usamos PUT (o PATCH) para la actualización
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ estado: nuevoEstado }), // Solo actualizamos el estado
    });

    if (!response.ok) {
      
      const errorData = await response.json(); 
      throw new Error(`Error HTTP al actualizar estado! Estado: ${response.status}. Mensaje: ${errorData.error || response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Respuesta del backend al actualizar estado:', data);
    alert('Estado del viaje actualizado exitosamente!');

    // Esta línea de abajo fue eliminada en el último paso porque ya no es necesaria
    // setCarreras((prevCarreras) => [...prevCarreras, nuevoViajeOID]); 

    setCarreras((prevCarreras) =>
      prevCarreras.map((carrera) =>
        carrera.id_viaje.$oid === idViaje ? { ...carrera, estado: nuevoEstado } : carrera
      )
    );

  } catch (error) {
    console.error('Error al actualizar el estado:', error);
    alert(`Hubo un problema al actualizar el estado : ${error.message}`);
  }
};

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Taxis SS reserva WEB -alice@email.com-
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Gestión inteligente de reservas
      </Typography>

      <Box sx={{ marginTop: '20px', padding: '20px', display: 'flex', gap: '20px', borderRadius: '8px', backgroundColor: 'grey' }}>

{/* =========================Contenedor izquierdo (Historial) ============================================== */}
        <Box
          sx={{
            width: '75%',
            height: 700,
            backgroundColor: '#e0f2f7',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '20px',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h4" component="h2" color="text.secondary" gutterBottom sx={{ fontWeight: 'bold' }}>
            Historial de Viajes por Usuario con SS Taxis
          </Typography>
          {carreras.length > 0 ? (
            carreras.map((carrera) => (
              <ViajeCard
                key={carrera.id_viaje.$oid} // usar una key única
                viaje={carrera}
                onUpdateEstado={handleUpdateEstadoViaje} //  función para actualizar 
              />
            ))
          ) : (
            <Typography>No hay carreras registradas para este usuario.</Typography>
          )}

        </Box>

{/* ========================================Contenedor derecho (Formulario) ==================================*/}
        <Box
          sx={{
            width: '25%',
            height: 700,
            backgroundColor: '#e0f2f7',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          <Typography variant="h4" component="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Solicitud de servicio
          </Typography>

          <Button variant="contained" color="primary" onClick={handleGuardarDatos} sx={{ mt: 2 }}>
            RESERVAR SERVICIO
          </Button>

          <TextField fullWidth label="Origen" name="origen" value={formData.origen} onChange={handleInputChange} margin="normal" />
          <TextField fullWidth label="Destino" name="destino" value={formData.destino} onChange={handleInputChange} margin="normal" />
          <TextField fullWidth label="Fecha" type="date" name="fecha" value={formData.fecha} onChange={handleInputChange} margin="normal" InputLabelProps={{ shrink: true }} />
          <TextField fullWidth label="Hora" type="time" name="hora" value={formData.hora} onChange={handleInputChange} margin="normal" InputLabelProps={{ shrink: true }} />

          <FormControl fullWidth margin="normal"> 
            <InputLabel id="estado-label">Estado</InputLabel>
            <Select
              labelId="estado-label" 
              id="form-estado-select" 
              label="Estado"
              name="estado"
              value={formData.estado} 
              onChange={handleInputChange}
              sx={{ fontSize: '18px' }}
            >
              <MenuItem value=""><em>Ninguno</em></MenuItem> 
              <MenuItem value="Solicitado">Solicitado</MenuItem>
              <MenuItem value="Iniciado">Iniciado</MenuItem>
              <MenuItem value="Finalizado">Finalizado</MenuItem>
              <MenuItem value="Cancelado">Cancelado</MenuItem>
            </Select>
          </FormControl>

          <TextField fullWidth label="Precio" type="number" name="precio" value={formData.precio} onChange={handleInputChange} margin="normal" />
        </Box>
      </Box>
    </>
  );
};

export default Carreras_web;