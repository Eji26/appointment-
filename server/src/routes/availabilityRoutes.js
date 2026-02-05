import express from 'express';
import { getAllAvailability, setAvailability, deleteAvailability } from '../controllers/availabilityController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllAvailability);

// Admin only routes
router.post('/', protect, authorize('ADMIN'), setAvailability);
router.delete('/:id', protect, authorize('ADMIN'), deleteAvailability);

export default router;
