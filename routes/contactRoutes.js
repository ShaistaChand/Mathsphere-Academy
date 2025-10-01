import express from 'express';
import { submitContact, getContacts } from '../controllers/contactController.js';

const router = express.Router();

// Demo request route (matches your frontend)
router.post('/demo-request', submitContact);

// Optional: Keep if you need to view contacts
router.get('/contacts', getContacts);

export default router;  // Changed from module.exports to export default