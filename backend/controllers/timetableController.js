const TimetableEntry = require('../models/TimetableEntry');

// @desc    Get all timetable entries
// @route   GET /api/timetable
// @access  Private
exports.getTimetableEntries = async (req, res, next) => {
    try {
        const entries = await TimetableEntry.find({ userId: req.user.id })
            .populate('category', 'name color icon')
            .sort({ daysOfWeek: 1, startTime: 1 });

        res.status(200).json({
            success: true,
            count: entries.length,
            data: entries,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single timetable entry
// @route   GET /api/timetable/:id
// @access  Private
exports.getTimetableEntry = async (req, res, next) => {
    try {
        const entry = await TimetableEntry.findOne({
            _id: req.params.id,
            userId: req.user.id,
        }).populate('category', 'name color icon');

        if (!entry) {
            return res.status(404).json({
                success: false,
                message: 'Timetable entry not found',
            });
        }

        res.status(200).json({
            success: true,
            data: entry,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create timetable entry
// @route   POST /api/timetable
// @access  Private
exports.createTimetableEntry = async (req, res, next) => {
    try {
        req.body.userId = req.user.id;

        const entry = await TimetableEntry.create(req.body);

        res.status(201).json({
            success: true,
            data: entry,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update timetable entry
// @route   PUT /api/timetable/:id
// @access  Private
exports.updateTimetableEntry = async (req, res, next) => {
    try {
        let entry = await TimetableEntry.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!entry) {
            return res.status(404).json({
                success: false,
                message: 'Timetable entry not found',
            });
        }

        entry = await TimetableEntry.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).populate('category', 'name color icon');

        res.status(200).json({
            success: true,
            data: entry,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete timetable entry
// @route   DELETE /api/timetable/:id
// @access  Private
exports.deleteTimetableEntry = async (req, res, next) => {
    try {
        const entry = await TimetableEntry.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!entry) {
            return res.status(404).json({
                success: false,
                message: 'Timetable entry not found',
            });
        }

        await entry.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
            message: 'Timetable entry deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get timetable for a specific day of week
// @route   GET /api/timetable/day/:dayOfWeek
// @access  Private
exports.getTimetableByDay = async (req, res, next) => {
    try {
        const dayOfWeek = parseInt(req.params.dayOfWeek);

        if (dayOfWeek < 1 || dayOfWeek > 7) {
            return res.status(400).json({
                success: false,
                message: 'Day of week must be between 1 (Monday) and 7 (Sunday)',
            });
        }

        const entries = await TimetableEntry.find({
            userId: req.user.id,
            daysOfWeek: dayOfWeek,
        })
            .populate('category', 'name color icon')
            .sort({ startTime: 1 });

        res.status(200).json({
            success: true,
            count: entries.length,
            data: entries,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get timetable for a specific date
// @route   GET /api/timetable/date/:date
// @access  Private
exports.getTimetableByDate = async (req, res, next) => {
    try {
        const date = new Date(req.params.date);
        const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay(); // Convert Sunday from 0 to 7

        const entries = await TimetableEntry.find({
            userId: req.user.id,
            daysOfWeek: dayOfWeek,
        })
            .populate('category', 'name color icon')
            .sort({ startTime: 1 });

        // Filter out excluded dates
        const dateString = date.toISOString().split('T')[0];
        const filteredEntries = entries.filter((entry) => {
            if (entry.excludedDates && entry.excludedDates.includes(dateString)) {
                return false;
            }
            if (entry.semesterStart && date < new Date(entry.semesterStart)) {
                return false;
            }
            if (entry.semesterEnd && date > new Date(entry.semesterEnd)) {
                return false;
            }
            return true;
        });

        res.status(200).json({
            success: true,
            count: filteredEntries.length,
            data: filteredEntries,
        });
    } catch (error) {
        next(error);
    }
};
