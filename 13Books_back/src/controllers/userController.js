const pool = require('../config/db');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const client = await pool.connect();
    try {
        const { username, email, password } = req.body;
        //const hashedPassword = await bcrypt.hash(password, 10);

        console.log('username en bk: ' + username);
        console.log('email en bk: ' + email);
        console.log('password en bk: ' +password);
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Introduce datos correctos. Todos los campos son obligatorios!' });
        }

        const query = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`;
        const values = [username, email, password];
        //  const values = [username, email, hashedPassword];
        const result = await client.query(query, values);

        const user = result.rows[0];
        const token = jwt.sign({ id: user.userid, email: user.email }, process.env.SECRET_KEY, { expiresIn: '5m' });

        res.status(201).json({token, user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'El usuario no ha podido registrarse' });
    } finally {
        client.release();
    }
};

const loginUser = async (req, res) => {
    const client = await pool.connect();

    try {
        const { email, password } = req.body;
        console.log('email en bk: ' + email);
        console.log('password en bk: ' + password);

        const result = await client.query('SELECT * FROM users WHERE email = $1 and password = $2', [email, password]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Usuario no encontrado.' });
        }
        const user = result.rows[0];
        //const validPassword = await bcrypt.compare(password, user.password);
        //if (!validPassword) {
        //  return res.status(400).json({ error: 'Credenciales incorrectas' });
        //}
        const token = jwt.sign({ id: user.userid, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token, user });
   
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'El usuario no ha podido logearse' });
    } finally {
        client.release();
    }
};
  

const logoutUser = (req, res) => {
    console.log('logout en bk');
    res.status(200).json({ message: 'Logout successful' });
};

module.exports = {
  register,
  loginUser,
  logoutUser,
};