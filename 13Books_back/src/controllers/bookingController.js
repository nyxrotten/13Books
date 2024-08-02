const pool = require('../config/db');

// #region METODOS MOSTRAR PEDIDOS
const showBooking = async (req, res) => {
    const client = await pool.connect();
  
    try {
      const result = await  client.query(`SELECT bkg.bookingid, bkg.clientid, bkg.bookid, 
                                        to_char(bkg.booking_date, 'DD/MM/YYYY') as booking_date,
                                        cli.name, cli.email, cli.role,
                                        bk.price, bk.title, bk.image, bk.author, gd.genre
                                        FROM bookings bkg
                                        JOIN clients cli ON cli.clientid = bkg.clientid
                                        JOIN books as bk ON bkg.bookid = bk.bookid
                                        JOIN genres as gd ON bk.genreid = gd.genreid 
                                        order by bkg.clientid, bk.title`);
      if (result.rows.length <= 0) {
        return res.status(404).send('No disponemos de reservas en estos momentos!');
      }
      res.status(200).json(result.rows);
  
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
}


const showBookingsByClientId = async (req, res) => {
   
    const client = await pool.connect();
    try {
        const { clientId } = req.params;
      
        const result = await client.query(`SELECT bkg.bookingid, bkg.clientid, bkg.bookid,  
                                        to_char(bkg.booking_date, 'DD/MM/YYYY') as booking_date,
                                        cli.name, cli.email, cli.role,
                                        bk.price, bk.title, bk.image, bk.author, gd.genre
                                        FROM bookings bkg
                                        JOIN clients cli ON cli.clientid = bkg.clientid
                                        JOIN books as bk ON bkg.bookid = bk.bookid
                                        JOIN genres as gd ON bk.genreid = gd.genreid 
                                        WHERE bkg.clientid = $1
                                        order by bk.title`, [clientId]);

                                          
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No disponemos de reservas para este cliente!' });
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

const createBooking = async (req, res) => {
   
    const client = await pool.connect();
    try {
        
      const { userId, bookid } = req.body;

      if (!req.body || !userId || !bookid) {
        return res.status(400).send({
            error: 'Los datos para crear la reserva son incorrectos. Intentalo de nuevo!'
        });
      }
     
      const query = `INSERT INTO bookings (clientid, bookid, booking_date)
                     VALUES ($1, $2, NOW()) RETURNING *`;
      const values = [userId, bookid];
      const result = await client.query(query, values);
      const bookingId = result.rows[0].bookingid;

      res.status(201).json({ booking: bookingId});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
}

const deleteBooking = async (req, res) => {
    const { bookingId } = req.params;
    console.log('bookingId ' + bookingId);

    const client = await pool.connect();
    try {

        if (!bookingId) {
            return res.status(400).send({
                error: 'Los datos para borrar la reserva son incorrectos. Intentalo de nuevo!'
            });
        }
        const result = await client.query('DELETE FROM bookings WHERE bookingid = $1 RETURNING *',[bookingId]);
        res.status(200).json({ order: result.rows[0] });
    } catch (err) {
         console.log(err);
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
}

module.exports = {
	showBooking,
    showBookingsByClientId,
    createBooking,
    deleteBooking,
}
