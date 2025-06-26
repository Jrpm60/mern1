import fs from 'fs';

function readFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                reject("Error reading file");
            }
            resolve(data);
        });
    });
}  

const result = await readFile('file1.txt');
console.log(result);

Promise.all([readFile("file1.txt"), readFile("file2.txt")])
    .then((result) => {
        console.log(result);   
})
.catch((err)=> {
    console.error("Error ");
})

