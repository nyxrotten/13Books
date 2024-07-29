const pool = require('../config/db');

// #region METODOS MOSTRAR CATALOGO
const showBooks = async (req, res) => {
    const client = await pool.connect();
  
    try {
      const result = await  client.query('SELECT * FROM books as bk JOIN  genres as gd ON bk.genreid = gd.genreid order by bk.title');
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
        const result = await client.query('SELECT * FROM books as bk JOIN  genres as gd ON bk.genreid = gd.genreid WHERE bookid = $1', [bookId]);
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
      
        const query = 'SELECT * FROM books as bk JOIN genres as gd ON bk.genreid = gd.genreid WHERE  LOWER(gd.genre) = LOWER($1) order by bk.title';
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
                        order by bk.title `;
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

      const query = `INSERT INTO BOOKS (title, author, isbn, editorial, language, publication_date, price, genreid, stock, image, summary)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
      const values = [title, author, isbn, editorial, language, publication_date, price, genreid, stock, image, summary];
      console.log(values);
      const result = await client.query(query, values);
      res.status(201).json({ book: result.rows[0] });
    } catch (err) {
        console.log(err);
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
}

const updateBook = async (req, res) => {

    console.log('entro por updateBook');
    const { bookId } = req.params;
    console.log('bookId '+ bookId);
    const client = await pool.connect();
    try {
      const { title, author, isbn, editorial, language, publication_date, price, genreid, stock, image, summary } = req.body;
   
      if (!req.body) 
        return res.status(400).send({
            error: 'Los datos para modificar el libro son incorrectos. Intentalo de nuevo!'
        });

      const query = `UPDATE BOOKS
                     SET title=$1, author=$2, isbn=$3, editorial=$4, language=$5, publication_date=$6,
                         price=$7, genreid=$8, stock=$9, image=$10, summary=$11
                     WHERE bookid = $12
                     RETURNING *
                    `;
      const values = [title, author, isbn, editorial, language, publication_date, price, genreid, stock, image, summary, bookId];
      
      const result = await client.query(query, values);
      if (result.rows.length === 0) {
            return res.status(404).json({ error: 'El libro no ha podido modificarse. Revise los datos!' });
      }

      res.status(200).json({ book: result.rows[0] });
    } catch (err) {
        console.log(err);
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
	
}

const deleteBook = async (req, res) => {
    console.log('entro por deleteBook');
    const { bookId } = req.params;
    console.log('bookId ' + bookId);
    const client = await pool.connect();
    try {
        const query = 'DELETE FROM books WHERE bookid = $1 RETURNING *';
        const values = [bookId];

        const result = await client.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'El libro no ha podido eliminarse. Revise los datos!' });
        }
        res.status(200).json({ book: result.rows[0] });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
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
