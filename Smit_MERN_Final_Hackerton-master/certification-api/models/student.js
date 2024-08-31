import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';  // For hashing passwords
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true  // Ensure roll number is unique
  },
  password: {
    type: String,
    required: true  // For login
  },
  batches: [{
    type: Schema.Types.ObjectId,
    ref: 'Batch'
  }]
}, {
  timestamps: true  // Adds createdAt and updatedAt fields
});

// Middleware to hash password before saving a student
studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// Method to check password validity
studentSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Student = mongoose.model('Student', studentSchema);

export default Student;
