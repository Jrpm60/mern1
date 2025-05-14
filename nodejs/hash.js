
//npm install bcrypt


import bcrypt from 'bcrypt'

const password = "qwerty";

const hash = await bcrypt.hash(password, 10);

const isMatch = await bcrypt.compare(password, hash)

console.log(isMatch);

console.log(hash);
