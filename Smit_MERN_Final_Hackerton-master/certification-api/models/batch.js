import mongoose from "mongoose";
const Schema = mongoose.Schema;

const batchSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    students: [{
      type: Schema.Types.ObjectId,
      ref: 'Student'
    }]
  });

const Batch = mongoose.model('Batch', batchSchema);

export default Batch;
