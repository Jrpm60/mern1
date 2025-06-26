import React, { useState, Suspense } from 'react';
//import LargeImage from './LargeImage';

const LargeImage = React.lazy(() => import('./LargeImage'));

export const LazyLoad = () => {
  const [showImage, setShowImage] = useState(false);

  return (
    <div>
      <h2>Ejemplo sin Lazy Loading</h2>
      <button onClick={() => setShowImage(true)}>Mostrar Imagen Grande</button>

      {/* {showImage && <LargeImage />} */}

        <Suspense fallback={<div>Cargando imagen...</div>}>
            {showImage && <LargeImage />}
        </Suspense>


    </div>
  );
}