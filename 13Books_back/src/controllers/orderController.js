const pool = require('../config/db');

// #region METODOS MOSTRAR PEDIDOS
const showOrders = async (req, res) => {
    const client = await pool.connect();
  
    try {
      const result = await  client.query(`SELECT o.orderid, o.clientid, o.status, 
                                                to_char(o.order_date, 'DD/MM/YYYY') as  order_date,
                                                to_char(o.delivery_date, 'DD/MM/YYYY') as delivery_date, o.total_price, 
                                                cli.name, cli.email, cli.role, count(od.bookid) as quantity
                                            FROM orders o
                                            JOIN clients cli ON cli.clientid = o.clientid
                                            JOIN orders_details od ON od.orderid = o.orderid
                                            GROUP BY o.orderid, o.clientid, o.status, o.order_date, o.delivery_date, 
                                                    o.total_price, cli.name, cli.email, cli.role
                                            ORDER BY o.orderid`);
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
        const result = await client.query(`SELECT o.orderid, o.clientid, o.status, 
                                            to_char(o.order_date, 'DD/MM/YYYY') as  order_date,
                                            to_char(o.delivery_date, 'DD/MM/YYYY') as delivery_date, o.total_price, 
                                            cli.name, cli.email, cli.role, od.bookid,
                                            od.quantity, od.price, bk.title, bk.image, bk.author, gd.genre
                                        FROM orders as o
                                        JOIN clients as cli ON cli.clientid = o.clientid
                                        JOIN orders_details as od ON od.orderid = o.orderid
                                        JOIN books as bk ON od.bookid = bk.bookid
                                        JOIN genres as gd ON bk.genreid = gd.genreid 
                                        WHERE o.orderId = $1
                                        order by bk.title`, [orderId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Pedido no encontrado!' });
        }
        res.status(200).json(result.rows);
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
      
        const result = await client.query(`SELECT o.orderid, o.clientid, o.status, 
                                                to_char(o.order_date, 'DD/MM/YYYY') as  order_date,
                                                to_char(o.delivery_date, 'DD/MM/YYYY') as delivery_date, o.total_price, 
                                                cli.name, cli.email, cli.role, count(od.bookid) as quantity
                                            FROM orders o
                                            JOIN clients cli ON cli.clientid = o.clientid
                                            JOIN orders_details od ON od.orderid = o.orderid
                                            WHERE o.clientid = $1
                                            GROUP BY o.orderid, o.clientid, o.status, o.order_date, o.delivery_date, 
                                                    o.total_price, cli.name, cli.email,  cli.role
                                            ORDER BY o.orderid`, [clientId]);

                                          
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No disponemos de pedidos para este cliente!' });
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

const createOrder = async (req, res) => {
   
    console.log('entro por createOrder');
    const client = await pool.connect();
    try {
        
      const { userId, total, order } = req.body;

      if (!req.body || !userId || !order || order.length === 0) {
        return res.status(400).send({
            error: 'Los datos para crear el pedido son incorrectos. Intentalo de nuevo!'
        });
    }
      await client.query('BEGIN'); 

        // inserto los datos del pedido en orders
      const query = `INSERT INTO orders (clientid, status, order_date, delivery_date, total_price)
                     VALUES ($1, 'SOLICITADO', NOW(), NULL, $2) RETURNING *`;
      const values = [userId, total];
      const result = await client.query(query, values);
      const orderId = result.rows[0].orderid;
    
      // inserto los detalles del pedido en order_details y resto el stock de cada libro
      for (const book of order) {
            await client.query(
                'INSERT INTO orders_details (orderid, bookid, quantity, price) VALUES ($1, $2, $3, $4)',
                [orderId, book.bookid, book.amount, book.price]
            );
            
            await client.query(
                'UPDATE books SET stock = stock - $2 WHERE bookid =  $1',
                [book.bookid, book.amount]
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


const updateOrder = async (req, res) => {

    console.log('entro por updateOrder');

    const { orderId } = req.params;
    console.log('orderId '+ orderId);

    const client = await pool.connect();
    try {
        
        const { status } = req.body;
        if (!req.body || !orderId || !status) {
          return res.status(400).send({
              error: 'Los datos para actualizar el pedido son incorrectos. Intentalo de nuevo!'
          });
        }
        const query = `UPDATE orders
                        SET status=$1, delivery_date=NOW()
                        WHERE orderid = $2
                        RETURNING *`;

        const values = [status, orderId];
        const result = await client.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'El pedido no ha podido modificarse. Revise los datos!' });
        }

        res.status(200).json({ order: result.rows[0] });
    } catch (err) {
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
    updateOrder,
    deleteOrder,
}
