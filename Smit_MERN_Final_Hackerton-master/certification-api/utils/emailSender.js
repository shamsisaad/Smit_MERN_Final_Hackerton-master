import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

// Function to send email with certificate attached
const sendCertificateEmail = async (studentEmail, studentName, certificatePath) => {
    try {
        // Create a nodemailer transporter (configure as per your email provider)
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can use any email service like SendGrid, Mailgun, etc.
            auth: {
                user: process.env.EMAIL_USER, // Email sender's address
                pass: process.env.EMAIL_PASS, // Email sender's password
            },
        });

        // Attach the certificate PDF
        const certificateFile = fs.readFileSync(certificatePath);

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: studentEmail,
            subject: `Certificate of Completion for ${studentName}`,
            text: `Hi ${studentName},\n\nCongratulations on completing your course! Attached is your certificate of completion.`,
            attachments: [
                {
                    filename: path.basename(certificatePath),
                    content: certificateFile,
                },
            ],
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email with certificate.');
    }
};

export default sendCertificateEmail;
