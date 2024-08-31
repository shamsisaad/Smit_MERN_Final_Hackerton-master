import BatchModel from '../models/batch';
import { generatePDF } from '../utils/pdfGenerator';
import nodemailer from 'nodemailer';

class NotificationController {
  static async getNotifications(req, res) {
    try {
      const batches = await BatchModel.find({ completed: true }).populate('students');
      res.status(200).json(batches);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch notifications' });
    }
  }

  static async generateCertificates(req, res) {
    const { batchId } = req.body;

    try {
      const batch = await BatchModel.findById(batchId).populate('students');
      const pdfs = await Promise.all(batch.students.map(student => generatePDF(student)));
      res.status(200).json({ pdfs });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate certificates' });
    }
  }

  static async sendNotifications(req, res) {
    const { batchId } = req.body;

    try {
      const batch = await BatchModel.findById(batchId).populate('students');

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-email-password',
        },
      });

      await Promise.all(
        batch.students.map(student =>
          transporter.sendMail({
            from: 'your-email@gmail.com',
            to: student.email,
            subject: 'Your Certificate',
            text: 'Congratulations! Here is your certificate.',
            attachments: [
              {
                filename: 'certificate.pdf',
                content: generatePDF(student),
              },
            ],
          })
        )
      );

      res.status(200).json({ message: '