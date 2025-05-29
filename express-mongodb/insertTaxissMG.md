Para insertar en el interface de Mongodb Atlas


{
  "_id": { "$oid": "000000000000000000000001" },
  "nombre": "Alice Smith",
  "correo_electronico": "alice@email.com",
  "saldo": 80,
  "viajes": [
    {
      "id_viaje": { "$oid": "66579c3d0000000000000000" },
      "lugar_recogida": "Calle Principal",
      "lugar_destino": "Avenida del Parque",
      "estado": "completado",
      "costo": 15,
      "fecha_hora": { "$date": "2025-05-27T14:00:00Z" }
    },
    {
      "id_viaje": { "$oid": "66579c3d0000000000000001" },
      "lugar_recogida": "Biblioteca",
      "lugar_destino": "Museo",
      "estado": "en curso",
      "costo": 9,
      "fecha_hora": { "$date": "2025-05-27T15:00:00Z" }
    }
  ]
}