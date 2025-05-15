import pool from './db-pg.js';


async function getUsers() {
  try {
    const result = await pool.query("SELECT * FROM scott.emp WHERE empno = $1 or empno = $2;", [7698, 7844]);
    
    return result.rows;

  } catch (err) {
    console.error('Error:', err.message);
    throw err;
  }

}


const users = await getUsers();
console.log(users);
await pool.end();  // simulate app termination - pool.end() closes all connections in the pool