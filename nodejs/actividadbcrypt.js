import prompt from 'prompt-sync';
import bcrypt, { hash } from 'bcrypt';
import fs from 'fs';


const input= prompt();


const username = input("Introducir un nombre de usuario:");
const password = input("Introducir contraseña de usuario:");

const passwordbc = await bcrypt.hash(password, 10);
//console.log(`La contraseña para el usuario ${username} es ${passwordbc}`);

const data = (`La contraseña para el usuario ${username} es ${passwordbc}\n`);

//fs.appendFileSync ("Databcrypt.txt",data);    Sincrona

fs.appendFile("Databcrypt.txt", data, (err) =>  {   // Asincrona

        if (err) {
            copnsole.log("error");
        }
        else {
            console.log("todo bien")
        }
})

//const continuar = input("Quieres continuar (y/n):");


console.log("Fin")
console.log("Fin")


