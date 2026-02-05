import express from 'express';
import { getServices, getService, createService, updateService, deleteService } from '../controllers/serviceController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getServices);
router.get('/:id', getService);

// Admin only routes
router.post('/', protect, authorize('ADMIN'), createService);
router.put('/:id', protect, authorize('ADMIN'), updateService);
router.delete('/:id', protect, authorize('ADMIN'), deleteService);

export default router;
