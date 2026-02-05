const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
// @access  Private
exports.getEvents = async (req, res, next) => {
    try {
        const { classification, category, isCompleted, startDate, endDate } = req.query;

        const query = { userId: req.user.id };

        if (classification) query.classification = classification;
        if (category) query.category = category;
        if (isCompleted !== undefined) query.isCompleted = isCompleted === 'true';
        if (startDate && endDate) {
            query.startTime = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }

        const events = await Event.find(query)
            .populate('category', 'name color icon')
            .sort({ startTime: 1 });

        res.status(200).json({
            success: true,
            count: events.length,
            data: events,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Private
exports.getEvent = async (req, res, next) => {
    try {
        const event = await Event.findOne({
            _id: req.params.id,
            userId: req.user.id,
        }).populate('category', 'name color icon');

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found',
            });
        }

        res.status(200).json({
            success: true,
            data: event,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private
exports.createEvent = async (req, res, next) => {
    try {
        req.body.userId = req.user.id;

        const event = await Event.create(req.body);

        res.status(201).json({
            success: true,
            data: event,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
exports.updateEvent = async (req, res, next) => {
    try {
        let event = await Event.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found',
            });
        }

        event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).populate('category', 'name color icon');

        res.status(200).json({
            success: true,
            data: event,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
exports.deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found',
            });
        }

        await event.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
            message: 'Event deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle event completion
// @route   PATCH /api/events/:id/complete
// @access  Private
exports.toggleComplete = async (req, res, next) => {
    try {
        const event = await Event.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found',
            });
        }

        event.isCompleted = !event.isCompleted;
        await event.save();

        res.status(200).json({
            success: true,
            data: event,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get events for a specific day
// @route   GET /api/events/day/:date
// @access  Private
exports.getEventsByDay = async (req, res, next) => {
    try {
        const date = new Date(req.params.date);
        const startOfDay = new Date(date.setHours(0, 0, 0, 0));
        const endOfDay = new Date(date.setHours(23, 59, 59, 999));

        const events = await Event.find({
            userId: req.user.id,
            startTime: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        })
            .populate('category', 'name color icon')
            .sort({ startTime: 1 });

        res.status(200).json({
            success: true,
            count: events.length,
            data: events,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get events in a date range
// @route   GET /api/events/range
// @access  Private
exports.getEventsByRange = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: 'Please provide startDate and endDate',
            });
        }

        const events = await Event.find({
            userId: req.user.id,
            startTime: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            },
        })
            .populate('category', 'name color icon')
            .sort({ startTime: 1 });

        res.status(200).json({
            success: true,
            count: events.length,
            data: events,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get upcoming deadlines
// @route   GET /api/events/upcoming
// @access  Private
exports.getUpcomingDeadlines = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const now = new Date();

        const events = await Event.find({
            userId: req.user.id,
            classification: { $in: ['assignment', 'deadline', 'exam'] },
            startTime: { $gte: now },
            isCompleted: false,
        })
            .populate('category', 'name color icon')
            .sort({ startTime: 1 })
            .limit(limit);

        res.status(200).json({
            success: true,
            count: events.length,
            data: events,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get today's stats
// @route   GET /api/events/stats/today
// @access  Private
exports.getTodayStats = async (req, res, next) => {
    try {
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const events = await Event.find({
            userId: req.user.id,
            startTime: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        });

        const stats = {
            classes: events.filter((e) => e.classification === 'class').length,
            assignments: events.filter((e) => e.classification === 'assignment').length,
            exams: events.filter((e) => e.classification === 'exam').length,
            meetings: events.filter((e) => e.classification === 'meeting').length,
            total: events.length,
        };

        res.status(200).json({
            success: true,
            data: stats,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get counts for a specific day
// @route   GET /api/events/counts/:date
// @access  Private
exports.getCountsForDay = async (req, res, next) => {
    try {
        const date = new Date(req.params.date);
        const startOfDay = new Date(date.setHours(0, 0, 0, 0));
        const endOfDay = new Date(date.setHours(23, 59, 59, 999));

        const events = await Event.find({
            userId: req.user.id,
            startTime: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        });

        const counts = {
            events: events.filter((e) => !['assignment', 'deadline', 'exam'].includes(e.classification))
                .length,
            tasks: events.filter((e) => ['assignment', 'deadline', 'exam'].includes(e.classification))
                .length,
            total: events.length,
        };

        res.status(200).json({
            success: true,
            data: counts,
        });
    } catch (error) {
        next(error);
    }
};
