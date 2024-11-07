const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminControllers');

// Route to get all events (approved and pending)
router.get('/events', adminController.getEvents);

// Route to approve an event
router.post('/events/approve/:id', adminController.approveEvent);
router.post('/events/disapprove/:id', adminController.disapprove);
router.post('/events/reject/:id', adminController.reject);

module.exports = router;
