const express = require('express');
const {
    getTimetableEntries,
    getTimetableEntry,
    createTimetableEntry,
    updateTimetableEntry,
    deleteTimetableEntry,
    getTimetableByDay,
    getTimetableByDate,
} = require('../controllers/timetableController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getTimetableEntries).post(protect, createTimetableEntry);

router
    .route('/:id')
    .get(protect, getTimetableEntry)
    .put(protect, updateTimetableEntry)
    .delete(protect, deleteTimetableEntry);

router.get('/day/:dayOfWeek', protect, getTimetableByDay);
router.get('/date/:date', protect, getTimetableByDate);

module.exports = router;
