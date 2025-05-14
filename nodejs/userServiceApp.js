import {getUserName} from "./userService.js"
import {getUserEmail} from "./userService.js"
import {getUserAdress} from "./userService.js"


/* const userName =await getUserName (1);
console.log(userName);

const userEmail =await getUserEmail (1);
console.log(userEmail);

const userAdress =await getUserAdress (1);
console.log(userAdress); */

const userIds = [1, 2, 3, 4, 5]; 

const fetchAndListUsers = async () => {
  for (const userId of userIds) {
    try {
      const name = await getUserName(userId);
      const email = await getUserEmail(userId);
      const adress = await getUserAdress(userId);


      console.log(`User ${userId}:`);
      console.log(`User Name: ${name}`);
      console.log(`Email: ${email}`);
      console.log(`Adress: ${adress}`);
      console.log('---');
    } catch (error) {
      console.error(`Error retrieving info for user ${userId}:`, error);
    }
  }
};


fetchAndListUsers();