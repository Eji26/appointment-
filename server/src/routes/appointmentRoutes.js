import express from 'express';
import {
    bookAppointment,
    getAppointments,
    cancelAppointment,
    updateAppointmentStatus
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getAppointments);
router.post('/book', bookAppointment);
router.put('/:id/cancel', cancelAppointment);
router.put('/:id/status', updateAppointmentStatus);


export default router;
