const mongoose = require('mongoose');

const attendanceRecordSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        courseName: {
            type: String,
            required: [true, 'Please provide a course name'],
            trim: true,
            index: true,
        },
        date: {
            type: Date,
            required: [true, 'Please provide a date'],
            index: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['present', 'absent', 'late', 'excused'],
        },
        notes: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Compound index for efficient querying
attendanceRecordSchema.index({ userId: 1, courseName: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('AttendanceRecord', attendanceRecordSchema);
