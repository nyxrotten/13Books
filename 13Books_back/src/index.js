const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

//conexión a bbdd
const pool = require('./config/db');
app.use(express.json());


app.get('/books', async (req, res) => {
  const client = await pool.connect();

  try {
    const result = await  client.query('select * from prueba_books');
    console.log(result.rows);
    if (result.rows.length <= 0) {
      return res.status(404).send('No hay libros!');
    }
    res.json(result.rows);

  } catch (err) {
    res.status(500).send('Error del servidor');
  } finally {
    client.release();
  }
  
});


app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
