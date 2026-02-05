const express = require('express');
const {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    toggleComplete,
    getEventsByDay,
    getEventsByRange,
    getUpcomingDeadlines,
    getTodayStats,
    getCountsForDay,
} = require('../controllers/eventController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(protect, getEvents).post(protect, createEvent);

router.route('/:id').get(protect, getEvent).put(protect, updateEvent).delete(protect, deleteEvent);

router.patch('/:id/complete', protect, toggleComplete);
router.get('/day/:date', protect, getEventsByDay);
router.get('/range', protect, getEventsByRange);
router.get('/upcoming', protect, getUpcomingDeadlines);
router.get('/stats/today', protect, getTodayStats);
router.get('/counts/:date', protect, getCountsForDay);

module.exports = router;
