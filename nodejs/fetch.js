function fetchData (id) {
    
    let timeOut = 2000;
    if (id == 1) {
        timeOut = 5000;
    }

    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if (id==3) {
                reject(`Data para ${id}`);
            }
            else {
            resolve(`Data para ${id} tardo ${timeOut}`);
            }
        },timeOut)

    })
}

const promise1 = fetchData(1);
const promise2 = fetchData(2);
const promise3 = fetchData(3);

Promise.all([promise1, promise2, promise3])
    .then(result => {
        console.log("Got result");
        console.log(result);
    })
    .catch((err) => {
        console.error("Error" + err);
    })