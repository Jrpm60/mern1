function getProfile() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Perfil"), 1000);
  });
}

function getPosts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Posts"), 2000);
  });
}

function getFriends() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Amigos"), 3000);
  });
}


Promise.all([getPosts(), getFriends(), getProfile()])
.then((results) => {
    console.log("Datos");
    console.log(results);
})
.catch((error)=> {
    console.error("Error en promesa");
})
