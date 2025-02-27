const Booking = require('../models/Bookings');

module.exports = {
    async store(req, res) {
        const { booking_id } = req.params;

        const booking = await (await Booking.findById(booking_id)).populate('spot').execPopulate();

        booking.approved = true;

        await booking.save();
        const bookingUserSocket = req.connectedUsers[booking.user]

        if (bookingUserSocket) {
            req.io.to(bookingUserSocket).emit('booking_response', booking);
        }

        return res.json(booking);
    }
}