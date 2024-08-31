import express from 'express';
import StudentController from '../controllers/StudentController.js';

const router = express.Router();

// Fetch all students in a batch
router.get('/students/batch/:batchId', StudentController.getStudentsByBatch);

// Check certificate validity by roll number
router.post('/students/validate-certificate', StudentController.checkCertificateValidity);

// Download certificate by roll number
router.get('/students/download-certificate/:rollNumber', StudentController.downloadCertificate);

// Student login route
router.post('/students/login', StudentController.login);

// Admin: Add a new student
router.post('/students', StudentController.addStudent);

// Admin: Reset student password
router.post('/students/reset-password', StudentController.resetPassword);

// Fetch student details by ID (for admin or student profile)
router.get('/students/:id', StudentController.getStudentById);

// Admin: Update student information
router.put('/students/:id', StudentController.updateStudent);

// src/routes/student.js
router.get('/student/me', authMiddleware, StudentController.getStudentDetails);


export default router;
