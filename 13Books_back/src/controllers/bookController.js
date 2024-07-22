const pool = require('../config/db');

// #region METODOS MOSTRAR CATALOGO
const showBooks = async (req, res) => {
    const client = await pool.connect();
  
    try {
      const result = await  client.query('SELECT * FROM books as bk JOIN  genres as gd ON bk.genreid = gd.genreid');
      if (result.rows.length <= 0) {
        return res.status(404).send('No disponemos de libros en estos momentos!');
      }
      res.status(200).json(result.rows);
  
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
} 


const showBookById = async (req, res) => {
    const client = await pool.connect();
    try {
        const { bookId } = req.params;
        const result = await client.query('SELECT * FROM books WHERE bookid = $1', [bookId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Libro no encontrado!' });
        }
        res.status(200).json(result.rows[0]);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
    
}

const showBooksByGenre = async (req, res) => {
    const client = await pool.connect();
    try {
        let { genre } = req.params;
        genre = genre.toLowerCase().trim();
      
        const query = 'SELECT * FROM books as bk JOIN genres as gd ON bk.genreid = gd.genreid WHERE  LOWER(gd.genre) = LOWER($1)';
        const result = await client.query(query, [genre]);
        if (result.rows.length <= 0) {
            return res.status(404).send('No disponemos de libros para ese género.');
        }
        res.status(200).json(result.rows);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
}

const searchBooks = async (req, res) => {

    const client = await pool.connect();
    try {
        let { searchtext } = req.params;
        searchtext = `%${searchtext.toLowerCase().trim()}%`;
      
        const query = `SELECT * 
                        FROM books as bk 
                        JOIN genres as gd ON bk.genreid = gd.genreid 
                        WHERE  LOWER(gd.genre) LIKE $1
                            OR LOWER(bk.title) LIKE $1
                            OR LOWER(bk.isbn) LIKE $1
                            OR LOWER(bk.author) LIKE $1
                        `;
        const result = await client.query(query, [searchtext]);
        if (result.rows.length <= 0) {
            return res.status(404).send('No disponemos de libros que coincidan con esta búsqueda');
        }
        res.status(200).json(result.rows);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
}

// #endregion

// #region METODOS para ADMINISTRADOR 

const createBook = async (req, res) => {
   
    console.log('entro por createBook');
    const client = await pool.connect();
    try {
      const { title, author, isbn, editorial, language, publication_date, price, genreid, stock, image, summary } = req.body;
      if (!req.body) 
        return res.status(400).send({
            error: 'Los datos para crear el libro son incorrectos. Intentalo de nuevo!'
        });

      const query = `INSERT INTO BOOKS (title, author, isbn, editorial, languaje, publication_date, price, genreid, stock, image, summary)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
      const values = [title, author, isbn, editorial, language, publication_date, price, genreid, stock, image, summary];
     
      const result = await client.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
    res.redirect(200, '/');
}

const updateBook = async (req, res) => {

    console.log('entro por updateBook');
	res.redirect(200, '/');
}

const deleteBook = async (req, res) => {
    console.log('entro por deleteBook');
	res.redirect(200, '/');
}

// #endregion
   

module.exports = {
	showBooks,
    showBookById,
    showBooksByGenre,
    searchBooks,
    createBook,
    updateBook,
    deleteBook,
}
