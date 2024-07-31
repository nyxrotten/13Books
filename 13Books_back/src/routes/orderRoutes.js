
const express = require("express");
const router = express.Router();
const authToken = require('../middlewares/authMiddleware');

const {
	showOrders,
    showOrderById,
    createOrder,
    deleteOrder,
    showOrdersByClientId,
} = require('../controllers/orderController');


router.get('/orders/:orderId', authToken, showOrderById);

router.get('/orders/client/:clientId', authToken, showOrdersByClientId);

router.get('/orders', authToken, showOrders);

router.post('/orders', authToken, createOrder);

router.delete('/orders/:orderId', authToken, deleteOrder);

module.exports = router;