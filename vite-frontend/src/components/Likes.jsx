import React, { useState } from 'react';

const posts = [
  {id: 1, titulo: "Full Stack Developer"},
  {id: 2, titulo: "Ingles B2"},
  {id: 3, titulo: "Mind Fullness"},
];

export default function Kafka() {
 
  const [postRatings, setPostRatings] = useState({});
  const [message, setMessage] = useState('');

 
  const handleRatingChange = (postId, value) => {
    setPostRatings(prevRatings => ({
      ...prevRatings,
      [postId]: value, 
    }));
  };

  
  const handleSubmitRating = async (postId) => {    
    const valoracion = parseFloat(postRatings[postId]);    
      if (isNaN(valoracion) || valoracion < 1 || valoracion > 5) {
        setMessage(`❌ Por favor, ingresa una valoración válida (1-5) para el curso ID ${postId}.`);
        return; 
      }
    const query =
     ` mutation Addlike($input: LikeInput!) { addLike(input: $input) } `;
     
    const variables = { 
      input: {
        id: postId, 
        valoracion: valoracion,
      },
    };

    console.log(`Enviando valoración para el Post ID ${postId}:`, variables);

    try {
      const response = await fetch('http://localhost:5001/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });

      const result = await response.json();

      if (result.data?.addLike) {
        setMessage(`✅ Valoración para el Post ID ${postId} enviada con éxito.`);
       
      } else {
        setMessage(`❌ Error al enviar valoración para el Post ID ${postId}.`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Error en la conexión con el servidor.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}> 
      <h2>Cursos en Nazaret</h2>

      {posts.map(p => (
        <div key={p.id} >
          <h3>Curso: {p.id}  /  {p.titulo}</h3>
                    
          <input
            type="number"
            value={postRatings[p.id] || ''} 
            onChange={(e) => handleRatingChange(p.id, e.target.value)}
            placeholder="Valora de 1-5"
            min="1" 
            max="5" 
            
          />
          <button            
            onClick={() => handleSubmitRating(p.id)}
            style={{
              marginTop: '5px',
              padding: '8px 15px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            👍 
          </button>
        </div>
      ))}

     
      {message && <p style={{ marginTop: '20px', color: message.startsWith('✅') ? 'green' : 'red', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}