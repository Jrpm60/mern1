import prompt from 'prompt-sync';
import fs from 'fs';


const input= prompt();

const titulo = input("Titulo de la pagina:");
const autor = input("Autor:");
const contenido = input("Contenido:");

//fs.appendFileSync ("Index.html");    Sincrona

const data = `
   <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="author" content=${autor}>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${titulo}</title>
    </head>
    <body>
        <h1>${titulo}</h1>
        <p>${contenido}</p>
        <footer><small>Created by ${autor}</small></footer>
    </body>
    </html>`


fs.appendFileSync ("Index.html", data);


console.log("Fin")


