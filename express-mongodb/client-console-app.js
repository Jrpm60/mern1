import promptSync from 'prompt-sync';


async function fetchProductos() {
  try {
    const response = await fetch('http://localhost:5000/api/v1/productos');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const productos = await response.json();
    return productos;
  } catch (error) {
        console.error('Error fetching products:', error);
  }
}

async function fetchMinProductos(minPrecio) {
  try {
    // El REST endpoint no existe - habrá que implementarlo en el servidor
    const response = await fetch(`http://localhost:5000/api/v1/productos/search?maxPrice=${minPrecio}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const productos = await response.json();
    return productos;
  } catch (error) {
        console.error('Error fetching products:', error);
  }
}

const totalInventoryValue = (productos) => {
  // usar reduce()
    
}


const productosActivos = (productos) => {
    // usar filter()
}

async function main() {
  const prompt = promptSync();

  let running = true;

  while (running) {
    console.log(`\n--- Gestor de productos ---
        1. List productos
        2. Total valor de inventario (precio * cantidad)
        3. Mostrar productos con un < precio maximo 
        4. Mostrar productos activos
        5. Exit`);

    const choice = prompt('Elegir una acción: ').trim();

    if (parseInt(choice)== 1) {
        const productos = await fetchProductos();
        console.log(productos);
    } 

    else if (parseInt(choice) == 2) { 
        const productos = await fetchProductos();
        let totalValue = totalInventoryValue(productos);
        console.log(`Total valor de inventario es ${totalValue}`);
    }

    else if (parseInt(choice) === 3) {
        const productos = await fetchMinProductos(15);
        console.log(productos);
    
    }

    else if (parseInt(choice) === 4) {
    const productos = await fetchProductos();
    const productosActivos = productos.filter(producto => producto.activo === true); 
    console.log(productosActivos);
    }
        
        
    
  
    /* else if (parseInt(choice) == 5) { 
    const productos = await fetchProductos();
        
        
    } */


    
    else {
        running = false;
    }

  };
}

// --------------
main();