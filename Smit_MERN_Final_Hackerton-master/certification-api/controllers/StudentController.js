import Student from "../models/student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class StudentController {
  static async login(req, res) {
    const { rollNumber, password } = req.body;
    try {
      const student = await Student.findOne({ rollNumber });
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, student.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token, student });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  }

  static async getStudentDashboard(req, res) {
    const studentId = req.user.id;  // Assuming JWT middleware is in place
    try {
      const student = await Student.findById(studentId).populate("batches");
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ message: "Error fetching student dashboard" });
    }
  }
}

export default StudentController;
