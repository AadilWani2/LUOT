import express from 'express';
import {
  getHods,
  updateHodStatus,
  createHod,
  deleteHod,
} from '../controllers/principalController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(protect, authorizeRoles('super_admin'));

router.get('/hods', getHods);
router.post('/hods', createHod);
router.patch('/hods/:id/status', updateHodStatus);
router.delete('/hods/:id', deleteHod);

export default router;