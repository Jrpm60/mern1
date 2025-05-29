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

async function guardarProducto(newProducto) {
  try {
    // El REST endpoint no existe - habrá que implementarlo en el servidor
    const response = await fetch(`http://localhost:5000/api/v1/productos`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newProducto)
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    return result;
  } catch (error) {
        console.error('Error fetching products:', error);
  }
}


const totalInventoryValue = (productos) => {
  // usar reduce()
  return productos.reduce((total, p ) => total + (p.precio * p.cantidad), 0);
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
        5. CRUD
        6. Exit`);

    const choice = prompt('Elegir una acción: ').trim();

    if (parseInt(choice)== 1) {
        const productos = await fetchProductos();
        console.log(productos);
    } 

    else if (parseInt(choice) == 2) { 
        const productos = await fetchProductos();
        //console.log(productos);
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
        
    else if (parseInt(choice) == 5) { 
      //---------------------------------------------------------------------------------

            let crudRunning = true; // Variable para controlar SOLO el bucle del CRUD
            while (crudRunning) {
                console.log(
                    `\n--- CRUD ---
                    1. Insertar Producto
                    2. Modificar Producto
                    3. Eliminar Producto 
                    4. Volver al Gestor`); 

                const choice1 = prompt('Elegir una acción: ').trim();

                if (parseInt(choice1) == 1) {
                    
                    const producto_id = prompt ( "ID Producto (dejar en blanco para autogenerar en MongoDB): "); 
                    const productoNombre = prompt ( "Nombre: ");
                    const precio = prompt ( "Precio: ");
                    const cantidad = prompt ( "Cantidad: ");
                    const activoInput = prompt ( "Activo (true/false): ");

                    const newProducto = {
                        producto_id: producto_id,
                        nombre: productoNombre,
                        precio: parseFloat(precio), 
                        cantidad: parseInt(cantidad), 
                        activo: activoInput.toLowerCase() === 'true'
                    };
                    const result = await guardarProducto(newProducto);
                    console.log("Producto a enviar:", newProducto);
                    console.log("Resultado de la inserción:", result);
                } 
                else if (parseInt(choice1) == 2) { 
                    const productos = await fetchProductos();
                    let totalValue = totalInventoryValue(productos);
                    console.log(`Total valor de inventario es ${totalValue}`);
                    console.log("Modificar Producto: Lógica no implementada aún."); 
                }
                else if (parseInt(choice1) === 3) {
                    const productos = await fetchMinProductos(15);
                    console.log(productos);
                    console.log("Eliminar Producto: Lógica no implementada aún.");
                }
                else if (parseInt(choice1) === 4) {
                    crudRunning = false; 
                }
                else {
                    console.log("Opción no válida en el menú CRUD.");
                    
                }

              };
      //--------------------------------------------------------------------

    }




  
    /* else if (parseInt(choice) == 6) { 
    const productos = await fetchProductos();
        
        
    } */


    
    else {
        running = false;
    }

  };
}

// --------------
main();