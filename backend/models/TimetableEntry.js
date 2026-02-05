const mongoose = require('mongoose');

const timetableEntrySchema = new mongoose.Schema(
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
        },
        courseCode: {
            type: String,
            trim: true,
        },
        instructor: {
            type: String,
            trim: true,
        },
        room: {
            type: String,
            trim: true,
        },
        daysOfWeek: {
            type: [Number],
            required: true,
            validate: {
                validator: function (days) {
                    return days.every((day) => day >= 1 && day <= 7);
                },
                message: 'Days of week must be between 1 (Monday) and 7 (Sunday)',
            },
        },
        startTime: {
            type: String,
            required: [true, 'Please provide a start time'],
            match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide time in HH:mm format'],
        },
        endTime: {
            type: String,
            required: [true, 'Please provide an end time'],
            match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide time in HH:mm format'],
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
        color: {
            type: String,
        },
        semesterStart: {
            type: Date,
        },
        semesterEnd: {
            type: Date,
        },
        excludedDates: [String], // ISO date strings
    },
    {
        timestamps: true,
    }
);

// Index for efficient querying
timetableEntrySchema.index({ userId: 1, daysOfWeek: 1 });

module.exports = mongoose.model('TimetableEntry', timetableEntrySchema);
