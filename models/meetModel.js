import mongoose from "mongoose";
const Schema = mongoose.Schema;


const meetingSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  startTime: {
    type: String,
    required: true,
  },
  EndTime: {
    type: String,
    
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


meetingSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});


export default mongoose.model('Meeting', meetingSchema);

