const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.POSTGRESSQL_URI,
    ssl: true
});

/*
const pool = new Pool({
    user: 'admin',
    host: 'dpg-cq81nlo8fa8c738blo10-a.frankfurt-postgres.render.com',
    database: 'books13',
    password: 'DfGdeiSfoqbzWSZmAlXvvPCIy4T6peDR',
    port: 5432,
    idleTimeoutMillis: 30000, // Cierra la conexión después de 30 segundos de inactividad
    connectionTimeoutMillis: 2000, // Tiempo máximo para establecer una conexión
    ssl: true
  });

*/

module.exports = pool;
