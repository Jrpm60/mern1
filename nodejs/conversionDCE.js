import prompt from 'prompt-sync';

const TASA = 0.85;
const input= prompt();

const usd = input("Introducir cantidad $USD:");

if (isNaN(usd)) {
    console.log("Incorrect");
}

else {
    console.log(typeof(usd));
    const eur = usd * TASA;
    console.log(typeof(eur));    
    console.log (`${eur} EUR.`);
}

