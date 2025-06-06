import React, { useEffect, useState } from 'react';

export default function RecetasList() {
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecetas() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query  {
                recetas {
                  _id
                  nombre
                  ingredientes {
                    nombre
                    cantidad
                  }
                  tiempoPreparacion
                  dificultad
                  vegano
                }
              }
            `
          }),
        });
        const json = await response.json();
        if (json.errors) {
          setError(json.errors[0].message);
        } else {
          setRecetas(json.data.recetas);
        }
      } catch (err) {
        setError('Error fetching data');
      }
      setLoading(false);
    }

    fetchRecetas();
  }, []);

  if (loading) return <p>Loading recetas...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(recetas)

  return (
    <div>
      <h2>Recetas List</h2>
      
        Mostrar la lista de recetas aqui ...

        {recetas.map((r, index) =>
        <ul>
          <li key={index}> 
            <b>Plato: </b>{r.nombre} <br></br>
            {r.vegano ? 'Vegano: Sí' : 'Vegano: No'}<br></br>
            <b>Tiempo de Preparacion: </b>{r.tiempoPreparacion} <br></br>
            <b>Dificultad: </b>{r.dificultad} <br></br>
               <b>Ingredientes: </b><br></br>
            ===================
              {r.ingredientes.map((i, index) =>
                <ul>
                  <li key={index}> 
                    {i.nombre} - 
                    {i.cantidad}
                  </li>
                </ul>
              )}
              ===================             
          </li>
        </ul>        
        )}

      


    </div>
  );
}