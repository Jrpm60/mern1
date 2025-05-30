import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Card, CardContent } from '@mui/material';
import { red } from '@mui/material/colors';

const Carreras_web = () => {
  const [formData, setFormData] = useState({
    origen: '',
    destino: '',
    fecha: '',
    estado: '',
    precio: '',
  });

  const [carreras, setCarreras] = useState([]);

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const id = "000000000000000000000001";
        const response = await fetch(`http://localhost:5000/api/v1/carreras/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data && data.length > 0 && data[0].viajes) {
          setCarreras(data[0].viajes);
        } else {
          setCarreras([]);
        }
      } catch (error) {
        console.error("Error fetching carreras:", error);
      }
    };
    fetchCarreras();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

const handleGuardarDatos = async () => {
  try {
    const nuevoViaje = {
      id_viaje: { $oid: new Date().getTime().toString() },
      lugar_recogida: formData.origen,
      lugar_destino: formData.destino,
      estado: "Reservado",
      costo: formData.precio,
      fecha_hora: { $date: `${formData.fecha}T${formData.hora}:00.000Z` } // Juntar fecha/hora ( en el formulario esta separado)
    };

    const response = await fetch('http://localhost:5000/api/v1/carreras', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoViaje),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP! Estado: ${response.status}`);
    }

    const data = await response.json();
    console.log('Viaje agregado:', data);
    alert('Viaje reservado exitosamente!');

    
    setCarreras([...carreras, nuevoViaje]); // Añadir nuevo viaje a carreras
    setFormData({origen: '', destino: '', fecha: '', hora: '', estado: '', precio: '',});

  } catch (error) {
    console.error('Error al guardar el viaje:', error);
    alert('Hubo un problema al reservar el viaje.');
  }
};
//===================================================================================================
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Taxis SS reserva WEB -alice@email.com-
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Gestión inteligente de reservas
      </Typography>

      {/* Contenedor principal con flexbox */}
      <Box sx={{ marginTop: '20px', padding: '20px', display: 'flex', gap: '20px', backgroundColor:rgb(74, 123, 136) }}>
        {/* Contenedor izquierdo (Historial) */}
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
          <Typography variant="h6" component="h2" color="text.secondary" gutterBottom>
            Historial de Viajes por Usuario con SS Taxis
          </Typography>
          {carreras.length > 0 ? (
            carreras.map((carrera) => (
              <Card key={carrera.id_viaje.$oid} variant="outlined" sx={{ mb: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Origen: {carrera.lugar_recogida}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Destino: {carrera.lugar_destino}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fecha/Hora: {new Date(carrera.fecha_hora.$date).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Estado: {carrera.estado}
                  </Typography>
                  <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
                    Costo: {carrera.costo}€
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>No hay carreras registradas para este usuario.</Typography>
          )}
          
        </Box>

        {/* Contenedor derecho (Formulario) */}
        <Box
          sx={{
            width: '25%',
            height: 700,
            backgroundColor: '#fff3e0',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            Detalles de la Reserva
          </Typography>

          <Button variant="contained" color="primary" onClick={handleGuardarDatos} sx={{ mt: 2 }}>
            RESERVAR SERVICIO
          </Button>

          <TextField fullWidth label="Origen" name="origen" value={formData.origen} onChange={handleInputChange} margin="normal" />
          <TextField fullWidth label="Destino" name="destino" value={formData.destino} onChange={handleInputChange} margin="normal" />
          <TextField fullWidth label="Fecha" type="date" name="fecha" value={formData.fecha} onChange={handleInputChange} margin="normal" InputLabelProps={{ shrink: true }} />
          <TextField fullWidth label="Hora"  type="time" name="hora" value={formData.hora} onChange={handleInputChange} margin="normal" InputLabelProps={{ shrink: true }}/>
          <TextField fullWidth label="Estado" name="estado" value={formData.estado} onChange={handleInputChange} margin="normal" />
          <TextField fullWidth label="Precio" type="number" name="precio" value={formData.precio} onChange={handleInputChange} margin="normal" />
        </Box>
      </Box>
    </>
  );
};

export default Carreras_web;


