export const roles = {
  admin: ['read:any', 'write:any'],
  user: ['read:own', 'write:own'], // ['read:own'],  - sus recursos solamente
};