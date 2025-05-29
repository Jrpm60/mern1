import React, { useState, useEffect } from 'react'; // Import useEffect
import { TextField, Button, Grid, Box, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const Carreras_web = () => {
  const [formData, setFormData] = useState({
    origen: '',
    destino: '',
    fecha: '',
    estado: '',
    precio: '',
  });

  const [carreras, setCarreras] = useState({}); 
  
  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        
        //const id = "000000000000000000000001"
        // http://localhost:5000/api/v1/carreras/{id}
        const response = await fetch('http://localhost:5000/api/v1/carreras/000000000000000000000001');
        // console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setCarreras(data); 
        } catch (error) {
        console.error("Error fetching carreras:", error);
        
      }
    };

    fetchCarreras();
  }, []); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReservar = () => {
    console.log('Datos de la reserva:', formData);
    // implementar el envio de datos
    
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Taxis SS reserva WEB ---- /usuario/---
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Gestión inteligente de reservas
      </Typography>

      <div style={{ marginTop: '20px' }}>
        <Grid container spacing={4}>
          {/* Bloque Izquierdo (Historico de viajes) */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: '100%', // Use 100% to be responsive within its grid item
                height: 550,
                backgroundColor: '#f5f5f5',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '20px', // Add padding for content
                overflowY: 'auto', // Add scroll for long lists
              }}
            >
              <Typography variant="h6" component="h2" color="text.secondary" gutterBottom>
                <h2>Historial de Viajes por Usuario con SS Taxis</h2>
              </Typography>
              {carreras.length > 0 ? (
                <ul>
                  {carreras.map((carrera) => (
                    <li key={carrera._id}> 
                      {carrera.lugar_recogida} <br />
                      {carrera.lugar_destino} <br />
                      {carrera.fecha_hora} <br />
                      {carrera.estado} <br />
                      {carrera.saldo}€
                      <hr />
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography>No hay carreras registradas.</Typography>
              )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleReservar}
              sx={{ mt: 2 }}
            >
                RESERVAR SERVICIO
            </Button>

            </Box>
          </Grid>

          {/* Bloque Derecho (Formulario para introducir datos) */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                padding: '20px',
                width: 300, 
                height: 512,
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom>
                Detalles de la Reserva
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Origen"
                    name="origen"
                    value={formData.origen}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Destino"
                    name="destino"
                    value={formData.destino}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Fecha"
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Precio"
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Carreras_web;