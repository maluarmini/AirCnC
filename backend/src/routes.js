const express = require('express');
const routes = express.Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovedController = require('./controllers/ApprovedController');
const RejectionController = require('./controllers/RejectionController');

const uploads = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/spots',uploads.single('thumbnail_name'), SpotController.store);
routes.get('/spots', SpotController.index);
routes.get('/dashboard', DashboardController.show);
routes.post('/spots/:spot_id/bookings', BookingController.store);
routes.post('/bookings/:booking_id/approvals',ApprovedController.store);
routes.post('/bookings/:booking_id/rejections',RejectionController.store);

 module.exports = routes;