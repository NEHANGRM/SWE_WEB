const mongoose = require('mongoose');

const voiceNoteSchema = new mongoose.Schema({
    id: String,
    filePath: String,
    recordedAt: Date,
    duration: Number, // in seconds
    tags: [String],
});

const eventSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: [true, 'Please provide an event title'],
            trim: true,
        },
        classification: {
            type: String,
            required: true,
            enum: ['class', 'exam', 'assignment', 'deadline', 'meeting', 'personal', 'other'],
            index: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
        startTime: {
            type: Date,
            required: [true, 'Please provide a start time'],
            index: true,
        },
        endTime: {
            type: Date,
        },
        location: {
            type: String,
            trim: true,
        },
        notes: {
            type: String,
        },
        attachments: [String],
        voiceNotes: [voiceNoteSchema],
        isCompleted: {
            type: Boolean,
            default: false,
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high', 'critical'],
            default: 'medium',
        },
        estimatedDuration: {
            type: String,
        },
        isAllDay: {
            type: Boolean,
            default: false,
        },
        isImportant: {
            type: Boolean,
            default: false,
        },
        reminders: [Date],
        color: {
            type: String,
        },
        metadata: {
            type: mongoose.Schema.Types.Mixed,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for efficient querying
eventSchema.index({ userId: 1, startTime: 1 });
eventSchema.index({ userId: 1, classification: 1 });
eventSchema.index({ userId: 1, category: 1 });
eventSchema.index({ userId: 1, isCompleted: 1 });

module.exports = mongoose.model('Event', eventSchema);
