import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Batch',  // Reference to the Batch model
      required: true
    },
    message: {
      type: String,
      required: true
    },
    isRead: {
      type: Boolean,
      default: false  // Initially, the notification is unread
    },
    createdAt: {
      type: Date,
      default: Date.now  // Automatically set the creation date
    }
  },
  {
    timestamps: true
  }
);

const NotificationModel = mongoose.model('Notification', notificationSchema);
export default NotificationModel;
