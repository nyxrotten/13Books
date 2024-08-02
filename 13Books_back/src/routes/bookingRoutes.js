
const express = require("express");
const router = express.Router();
const authToken = require('../middlewares/authMiddleware');

const {
	showBooking,
    createBooking,
    deleteBooking,
    showBookingsByClientId,
} = require('../controllers/bookingController');


router.get('/bookings/:clientId', authToken, showBookingsByClientId);

router.get('/bookings', authToken, showBooking);

router.post('/bookings', authToken, createBooking);

router.delete('/bookings/:bookingId', authToken, deleteBooking);

module.exports = router;
