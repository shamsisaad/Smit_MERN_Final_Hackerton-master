
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  }
});

const Course = mongoose.model('Course', courseSchema);

export default Course
