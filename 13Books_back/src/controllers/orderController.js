const pool = require('../config/db');

// #region METODOS MOSTRAR PEDIDOS
const showOrders = async (req, res) => {
    const client = await pool.connect();
  
    try {
      const result = await  client.query(`SELECT * 
                                    FROM orders as o
                                    JOIN clients as cli ON cli.clientid = o.clientid
                                    JOIN orders_details as od ON od.orderid = o.orderid
                                    JOIN books as bk ON od.bookid = bk.bookid
                                    JOIN genres as gd ON bk.genreid = gd.genreid 
                                    order by o.orderid, bk.title`);
      if (result.rows.length <= 0) {
        return res.status(404).send('No disponemos de pedidos en estos momentos!');
      }
      res.status(200).json(result.rows);
  
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
}


const showOrderById = async (req, res) => {
    const client = await pool.connect();
    try {
        const { orderId } = req.params;
        const result = await client.query(` SELECT * 
                                        FROM orders as o
                                        JOIN clients as cli ON cli.clientid = o.clientid
                                        JOIN orders_details as od ON od.orderid = o.orderid
                                        JOIN books as bk ON od.bookid = bk.bookid
                                        JOIN genres as gd ON bk.genreid = gd.genreid 
                                        WHERE o.orderId = $1
                                        order bk.title`, [orderId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Pedido no encontrado!' });
        }
        res.status(200).json(result.rows[0]);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
    
}

const showOrdersByClientId = async (req, res) => {
    const client = await pool.connect();
    try {
        const { clientId } = req.params;
        const result = await client.query(`SELECT * 
                                            FROM orders as o
                                            JOIN clients as cli ON cli.clientid = o.clientid
                                            JOIN orders_details as od ON od.orderid = o.orderid
                                            JOIN books as bk ON od.bookid = bk.bookid
                                            JOIN genres as gd ON bk.genreid = gd.genreid 
                                            WHERE o.clientid = $1
                                            order by o.orderid, bk.title`, [clientId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No disponemos de pedidos para este cliente!' });
        }
        res.status(200).json(result.rows[0]);
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
    
}

// #endregion

const createOrder = async (req, res) => {
   
    console.log('entro por createOrder');
    const client = await pool.connect();
    try {
        console.log(req.body);
      const { userId, order } = req.body;

      await client.query('BEGIN'); 
      
      console.log(userId);
      console.log(order);
   
        if (!req.body || !userId || !order || order.length === 0) {
            return res.status(400).send({
                error: 'Los datos para crear el pedido son incorrectos. Intentalo de nuevo!'
            });
        }

        // inserto los datos del pedido en orders
      const query = `INSERT INTO orders (clientid, status, order_date, delivery_date)
                     VALUES ($1, 'SOLICITADO', NOW(), NULL) RETURNING *`;
      const values = [userId];
      const result = await client.query(query, values);
      const orderId = result.rows[0].orderid;
      console.log(orderId);

      // inserto los detalles del pedido en order_details
      for (const book of order) {
            await client.query(
                'INSERT INTO order_details (orderid, bookid, amount, price) VALUES ($1, $2, $3, $4)',
                [orderId, book.bookid, book.amount, book.price]
            );
      }

      await client.query('COMMIT'); 

      res.status(201).json({ order: orderId});
    } catch (err) {
        await client.query('ROLLBACK'); 
        console.log(err);
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
}


const deleteOrder = async (req, res) => {
    console.log('entro por deleteOrder');
    const { orderId } = req.params;
    console.log('orderid ' + orderId);

    const client = await pool.connect();
    try {

        if (!orderId) {
            return res.status(400).send({
                error: 'Los datos para borrar el pedido son incorrectos. Intentalo de nuevo!'
            });
        }
        await client.query('BEGIN'); 

        const result2 = await client.query('DELETE FROM orders_details WHERE orderid = $1 RETURNING *',[orderId]);

        const result = await client.query('DELETE FROM orders WHERE orderid = $1 RETURNING *',[orderId]);
       
        await client.query('COMMIT');

        res.status(200).json({ order: result.rows[0] });
    } catch (err) {
        await client.query('ROLLBACK'); 
        console.log(err);
        res.status(500).json({ error: err.message });
    } finally {
        client.release();
    }
}

module.exports = {
	showOrders,
    showOrderById,
    showOrdersByClientId,
    createOrder,
    deleteOrder,
}
