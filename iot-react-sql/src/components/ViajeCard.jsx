// src/components/ViajeCard.jsx
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Select, MenuItem } from '@mui/material';

const ViajeCard = ({ viaje, onUpdateEstado }) => {

  const [estadoEditable, setEstadoEditable] = useState(false);
  const [estadoActualSeleccionado, setEstadoActualSeleccionado] = useState(viaje.estado); // Inicializa con el estado actual del viaje

  const handleEstadoSet = () => {
    setEstadoEditable((prev) => !prev);
  };

  const handleEstadoChange = (event) => {
    setEstadoActualSeleccionado(event.target.value);
  };

  const handleConfirmUpdate = () => {
    
    onUpdateEstado(viaje.id_viaje.$oid, estadoActualSeleccionado); // id viaje y nuevo estado
    setEstadoEditable(false); 
  };

  return (
    <Card key={viaje.id_viaje.$oid} variant="outlined" sx={{ mb: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold',visibility: 'hidden' }}> {/* "invisible" */}
          ID Viaje: {viaje.id_viaje.$oid}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Origen: {viaje.lugar_recogida}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Destino: {viaje.lugar_destino}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Fecha/Hora: {new Date(viaje.fecha_hora.$date).toLocaleString()}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Estado: {viaje.estado} 
        </Typography>
        <Typography variant="h6" color="text.primary" sx={{ mt: 1 }}>
          Costo: {viaje.costo}€
        </Typography>

        {/* Sección de actualización de estado */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1, mt: 2 }}>
          <Button
            variant="contained"
            color="white"
            onClick={handleEstadoSet} 
            sx={{ minWidth: '40px', padding: '5px' }}
          >
            ✍️
          </Button>

          {estadoEditable && (
            <Select
              value={estadoActualSeleccionado} // Usa el estado local de esta tarjeta
              onChange={handleEstadoChange}
              sx={{ minWidth: '100px', fontSize: '12px' }}
            >
              <MenuItem value="Confirmado">Confirmado</MenuItem>
              <MenuItem value="Iniciado">Iniciado</MenuItem>
              <MenuItem value="Finalizado">Finalizado</MenuItem>
              <MenuItem value="Cancelado">Cancelado</MenuItem>
            </Select>
          )}

          {estadoEditable && (
            <Button
              variant="contained"
              color="white"
              onClick={handleConfirmUpdate} // Llama a la función de confirmación local
              sx={{ minWidth: '40px', padding: '5px' }}
            >
              ✅
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ViajeCard;