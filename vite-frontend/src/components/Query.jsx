import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchImageById = async ({ queryKey }) => {
    const [, id] = queryKey; // Extraemos el ID del queryKey
    console.log(`Fetching image with ID: ${id}`);
    // Usamos el ID en la URL para obtener una imagen específica
    return `https://picsum.photos/id/${id}/200/200`;
};

const Query = () => {
    const [imageId, setImageId] = useState(1);
    const [submittedId, setSubmittedId] = useState(1); 

    const { data: imageUrl, isLoading, error } = useQuery({
        queryKey: ['image', Number(submittedId)], 
        queryFn: fetchImageById,
        staleTime: 10000, // 10 segundos
        onSuccess: () => console.log('Imagen cargada/recargada'),
        onError: (err) => console.error('Error de carga:', err),
    });

    return (
        <>
            
            ID de Imagen: <input type="number" value={imageId} onChange={(e) => setImageId(e.target.value)} />
            

            {isLoading && <div>Cargando imagen...</div>}
            {error && <div>Error al cargar la imagen. Asegúrate de que el ID sea válido.</div>}
            {!isLoading && !error && imageUrl && (
                <div>
                    
                    <img src={imageUrl} alt={`Imagen con ID ${submittedId}`} style={{ width: '200px', height: '200px' }} />
                </div>
            )}
            <button onClick={() => setSubmittedId(imageId)}>Obtener Imagen</button>
        </>
    );
};

export default Query;