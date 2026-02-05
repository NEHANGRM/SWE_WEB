const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        name: {
            type: String,
            required: [true, 'Please provide a category name'],
            trim: true,
        },
        color: {
            type: String,
        },
        icon: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Ensure unique category names per user
categorySchema.index({ userId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Category', categorySchema);
