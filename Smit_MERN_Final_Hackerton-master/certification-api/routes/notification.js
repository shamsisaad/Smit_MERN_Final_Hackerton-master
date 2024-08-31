import express from 'express';
import NotificationController from '../controllers/NotificationController.js';

const router = express.Router();

// Fetch all notifications for the admin
router.get('/notifications', NotificationController.getAllNotifications);

// Mark a specific notification as read
router.put('/notifications/:id/read', NotificationController.markAsRead);

// Generate certificate notification for a batch
router.post('/notifications/generate', NotificationController.generateCertificateNotification);

export default router;
