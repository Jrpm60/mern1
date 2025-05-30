// server.js

import promptSync from 'prompt-sync';
import {
  createTable,
  addProducto,
  listProductos,
  updateProducto,
  deleteProducto,
  buscoProductos,
  bajoStock
} from './models/productoModel.js';

const prompt = promptSync();

const main = async () => {
  await createTable(); // Ensure the table is created if it doesn't exist

  let running = true;

  while (running) {
    console.log(`
--- ADMIN PRODUCT MANAGER ---
1. Listar all products
2. Agregar new product
3. Actualizar product
4. Borrar product
5. Buscar producto
6. Productos bajo stock
7. Exit`);

    const choice = prompt('Choose an option: ').trim();

    try {
      switch (choice) {
        case '1': {  //------------- LISTA DE PRODUCTOS ------------------------------
          const productos = await listProductos();
          // console.log(productos);
          if (productos.length === 0) console.log('No products found.');
          else {
            productos.forEach(p => {
              console.log(`${p.id}: ${p.nombre} | $${p.precio} | Stock: ${p.stock}`);
            });
          }
          break;
        }

        case '2': { //------ AGREGAR NUEVO PODRUCTO  ----------------------------------
          const nombre = prompt('Enter product name: ');
          const precio = parseFloat(prompt('Enter product price: '));
          const stock = parseInt(prompt('Enter stock quantity: '), 10);
          const id = await addProducto(nombre, precio, stock);
          console.log(`Product added with ID: ${id}`);
          break;
        }

        case '3': { //---- ACTUALIZAR PRODUCTO ---------------------------------------------
          const updateId = prompt('Enter product ID to update: ');
          const newName = prompt('Enter new name: ');
          const newPrice = parseFloat(prompt('Enter new price: '));
          const newStock = parseInt(prompt('Enter new stock quantity: '), 10);
          const changes = await updateProducto(updateId, newName, newPrice, newStock);
          console.log(`Updated ${changes} product(s).`);
          break;
        }

        case '4': { //----------- BORRAR PRODUCTO  --------------------------------
          const deleteId = prompt('Enter product ID to delete: ');
          const changes = await deleteProducto(deleteId);
          console.log(`Deleted ${changes} product(s).`);
          break;
        }

        // Agregar opciones:
        // 5 - Buscador: 
        // Dado que el usuario introduce un nombre de un producto, mostrar todos los productos que contengan este nombre
        
        case '5': { //---- BUSCADOR ( por productos que contengan todo o parte de la sleccion del usuario) ----
          const buscoPro = prompt('Enter nombre product to find: ');
          const productos = await buscoProductos(buscoPro);
          // console.log(productos);
          if (productos.length === 0) console.log('No products found.');
          else {
            productos.forEach(p => {
              console.log(`${p.id}: ${p.nombre} | $${p.precio} | Stock: ${p.stock}`);
            });
          }
          break;
        }


        // 6 - productos bajo en stock
        // Mostrar los productos que hay pocos, por ejemplo, menos de 3 en stock.
        
        case '6': { //---- BUSCADOR ( por productos stock < 3) ----
          const bajoStck = prompt('Enter minimum stock level: ');
          const productos = await bajoStock (bajoStck);
          // console.log(productos);
          if (productos.length === 0) console.log('No products found.');
          else {
            productos.forEach(p => {
              console.log(`${p.id}: ${p.nombre} | $${p.precio} | Stock: ${p.stock}`);
            });
          }
          break;
        }

        case '7':
          running = false;
          break;

        default:
          console.log('Invalid choice.');
      }
    } catch (err) {
      console.error('Error:', err.message);
    }
  }

  console.log('Exiting...');
};

main();