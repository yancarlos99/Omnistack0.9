const express = require('express');
const multer = require('multer')
const uploadConfig = require ('./config/upload')

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashBoardController = require('./controllers/DashBoardController');
const BookingController = require('./controllers/BookingController');
const AprovalController = require('./controllers/AprovalController');
const RejectController = require('./controllers/RejectController');

const routes = express.Router();
const upload = multer(uploadConfig);

//Rota de usuarios
routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);

//Rota dos spots
routes.post('/spots', upload.single('thumbnail') ,SpotController.store);

routes.get('/dashboard', DashBoardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.post('/bookings/:booking_id/approvals', AprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectController.store);

module.exports = routes;


