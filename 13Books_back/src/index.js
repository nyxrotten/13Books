const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes/bookRoutes');
app.use('/', routes);
app.use('/users', userRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
