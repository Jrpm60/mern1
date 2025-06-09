import promptSync from 'prompt-sync';
import connectDB from './db-mongodb.js';
import { ObjectId } from 'mongodb';

const prompt = promptSync();

async function main() {
  const db = await connectDB();
  const collection = db.collection('movies'); 


  while (true) {
    const action = prompt('¿Qué quieres hacer? ').toLowerCase();

    if (action === 'exit') {
      console.log('Exiting...');
      process.exit(0);
    } else if (action === 'buscar') {
        const titulo = prompt ( "Que pelicula quieres buscar: ");

        const movies = await collection.find ({title: {$regex : `${titulo}`}}).toArray();

        movies.forEach(movie => {
            console.log(movie.title);
        });
        
    } else if (action === 'insert') {
      // insertar un nueve user - preguntar al usuario por los datos para insertar
        const titulo = prompt ( "Titulo : ");
        const type = prompt ( "Tipo: ");
        const movie_year = prompt ( "Año: ");

        const newPelicula = {
                title: titulo,
                type: type,
                year: parseInt(movie_year), 
        };

                console.log(newPelicula);

                const res = await collection.insertOne(newPelicula);

                console.log(res);           
                    
    }  else if (action === 'borrar') { 
        const idBorr = prompt ( "Id Elemento a borrar : ");

            const res = await collection.deleteOne({_id : new ObjectId (idBorr)});

            console.log(res);


    };

    // Borrar
    // Borrar una pelicula basado en el criterio de busqueda. 
    //    Solo puedes borrar uno, asi que se se devuelve mas de uno, mostrar un mensaje

    // Actualizar
    // actualizar el plot (argumento) y el rating (rated) de una pelicula. 

  }

}

main();
