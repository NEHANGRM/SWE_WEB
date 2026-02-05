const AttendanceRecord = require('../models/AttendanceRecord');

// @desc    Get all attendance records
// @route   GET /api/attendance
// @access  Private
exports.getAttendanceRecords = async (req, res, next) => {
    try {
        const { courseName, startDate, endDate } = req.query;

        const query = { userId: req.user.id };

        if (courseName) query.courseName = courseName;
        if (startDate && endDate) {
            query.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }

        const records = await AttendanceRecord.find(query).sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: records.length,
            data: records,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Mark attendance
// @route   POST /api/attendance
// @access  Private
exports.markAttendance = async (req, res, next) => {
    try {
        req.body.userId = req.user.id;

        // Check if attendance already exists for this date and course
        const existing = await AttendanceRecord.findOne({
            userId: req.user.id,
            courseName: req.body.courseName,
            date: new Date(req.body.date),
        });

        let record;
        if (existing) {
            // Update existing record
            record = await AttendanceRecord.findByIdAndUpdate(existing._id, req.body, {
                new: true,
                runValidators: true,
            });
        } else {
            // Create new record
            record = await AttendanceRecord.create(req.body);
        }

        res.status(existing ? 200 : 201).json({
            success: true,
            data: record,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update attendance record
// @route   PUT /api/attendance/:id
// @access  Private
exports.updateAttendance = async (req, res, next) => {
    try {
        let record = await AttendanceRecord.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!record) {
            return res.status(404).json({
                success: false,
                message: 'Attendance record not found',
            });
        }

        record = await AttendanceRecord.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: record,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete attendance record
// @route   DELETE /api/attendance/:id
// @access  Private
exports.deleteAttendance = async (req, res, next) => {
    try {
        const record = await AttendanceRecord.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!record) {
            return res.status(404).json({
                success: false,
                message: 'Attendance record not found',
            });
        }

        await record.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
            message: 'Attendance record deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get attendance for a specific course
// @route   GET /api/attendance/course/:courseName
// @access  Private
exports.getAttendanceByCourse = async (req, res, next) => {
    try {
        const records = await AttendanceRecord.find({
            userId: req.user.id,
            courseName: req.params.courseName,
        }).sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: records.length,
            data: records,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get attendance stats for a course
// @route   GET /api/attendance/stats/:courseName
// @access  Private
exports.getCourseStats = async (req, res, next) => {
    try {
        const records = await AttendanceRecord.find({
            userId: req.user.id,
            courseName: req.params.courseName,
        });

        const stats = {
            totalClasses: records.length,
            present: records.filter((r) => r.status === 'present').length,
            absent: records.filter((r) => r.status === 'absent').length,
            late: records.filter((r) => r.status === 'late').length,
            excused: records.filter((r) => r.status === 'excused').length,
        };

        stats.attendancePercentage =
            stats.totalClasses > 0 ? ((stats.present / stats.totalClasses) * 100).toFixed(2) : 0;
        stats.presentWithLatePercentage =
            stats.totalClasses > 0
                ? (((stats.present + stats.late) / stats.totalClasses) * 100).toFixed(2)
                : 0;

        res.status(200).json({
            success: true,
            data: stats,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get overall attendance stats
// @route   GET /api/attendance/stats
// @access  Private
exports.getAllStats = async (req, res, next) => {
    try {
        const records = await AttendanceRecord.find({ userId: req.user.id });

        // Group by course name
        const courseMap = {};
        records.forEach((record) => {
            if (!courseMap[record.courseName]) {
                courseMap[record.courseName] = [];
            }
            courseMap[record.courseName].push(record);
        });

        const courseStats = Object.keys(courseMap).map((courseName) => {
            const courseRecords = courseMap[courseName];
            const stats = {
                courseName,
                totalClasses: courseRecords.length,
                present: courseRecords.filter((r) => r.status === 'present').length,
                absent: courseRecords.filter((r) => r.status === 'absent').length,
                late: courseRecords.filter((r) => r.status === 'late').length,
                excused: courseRecords.filter((r) => r.status === 'excused').length,
            };

            stats.attendancePercentage =
                stats.totalClasses > 0 ? ((stats.present / stats.totalClasses) * 100).toFixed(2) : 0;

            return stats;
        });

        res.status(200).json({
            success: true,
            count: courseStats.length,
            data: courseStats,
        });
    } catch (error) {
        next(error);
    }
};
