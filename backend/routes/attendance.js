const express = require('express');
const {
    getAttendanceRecords,
    markAttendance,
    updateAttendance,
    deleteAttendance,
    getAttendanceByCourse,
    getCourseStats,
    getAllStats,
} = require('../controllers/attendanceController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getAttendanceRecords).post(protect, markAttendance);

router.route('/:id').put(protect, updateAttendance).delete(protect, deleteAttendance);

router.get('/course/:courseName', protect, getAttendanceByCourse);
router.get('/stats', protect, getAllStats);
router.get('/stats/:courseName', protect, getCourseStats);

module.exports = router;
