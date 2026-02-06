// Mock Event Service for Frontend-only Demo
const MOCK_EVENTS = [
    {
        _id: '1',
        title: 'Complete Math Assignment',
        type: 'assignment',
        priority: 'high',
        date: new Date().toISOString(),
        completed: false,
        category: 'Education'
    },
    {
        _id: '2',
        title: 'Review Physics Notes',
        type: 'revision',
        priority: 'medium',
        date: new Date().toISOString(),
        completed: true,
        category: 'Education'
    },
    {
        _id: '3',
        title: 'Project Deadline',
        type: 'deadline',
        priority: 'high',
        date: new Date(Date.now() + 86400000).toISOString(),
        completed: false,
        category: 'Project'
    }
];

export const eventService = {
    // Get all events
    getEvents: async (filters = {}) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            success: true,
            data: MOCK_EVENTS
        };
    },

    // Get single event
    getEvent: async (id) => {
        const event = MOCK_EVENTS.find(e => e._id === id);
        return {
            success: true,
            data: event
        };
    },

    // Create event
    createEvent: async (eventData) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const newEvent = { ...eventData, _id: Date.now().toString() };
        return {
            success: true,
            data: newEvent
        };
    },

    // Update event
    updateEvent: async (id, eventData) => {
        return {
            success: true,
            data: { ...eventData, _id: id }
        };
    },

    // Delete event
    deleteEvent: async (id) => {
        return {
            success: true,
            message: 'Event deleted'
        };
    },

    // Toggle completion
    toggleComplete: async (id) => {
        return {
            success: true,
            message: 'Status updated'
        };
    },

    // Get events for a specific day
    getEventsByDay: async (date) => {
        return {
            success: true,
            data: MOCK_EVENTS
        };
    },

    // Get upcoming deadlines
    getUpcomingDeadlines: async (limit = 10) => {
        return {
            success: true,
            data: MOCK_EVENTS.filter(e => e.type === 'deadline')
        };
    },

    // Get today's stats
    getTodayStats: async () => {
        return {
            success: true,
            data: {
                total: 5,
                completed: 2,
                pending: 3,
                attendance: '85%',
                upcomingCount: 2
            }
        };
    },

    // Get counts for a day
    getCountsForDay: async (date) => {
        return {
            success: true,
            data: { count: 3 }
        };
    },
};
