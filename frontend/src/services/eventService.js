import api from './api';

export const eventService = {
    // Get all events
    getEvents: async (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        const response = await api.get(`/events${params ? `?${params}` : ''}`);
        return response.data;
    },

    // Get single event
    getEvent: async (id) => {
        const response = await api.get(`/events/${id}`);
        return response.data;
    },

    // Create event
    createEvent: async (eventData) => {
        const response = await api.post('/events', eventData);
        return response.data;
    },

    // Update event
    updateEvent: async (id, eventData) => {
        const response = await api.put(`/events/${id}`, eventData);
        return response.data;
    },

    // Delete event
    deleteEvent: async (id) => {
        const response = await api.delete(`/events/${id}`);
        return response.data;
    },

    // Toggle completion
    toggleComplete: async (id) => {
        const response = await api.patch(`/events/${id}/complete`);
        return response.data;
    },

    // Get events for a specific day
    getEventsByDay: async (date) => {
        const response = await api.get(`/events/day/${date}`);
        return response.data;
    },

    // Get events in range
    getEventsByRange: async (startDate, endDate) => {
        const response = await api.get(`/events/range?startDate=${startDate}&endDate=${endDate}`);
        return response.data;
    },

    // Get upcoming deadlines
    getUpcomingDeadlines: async (limit = 10) => {
        const response = await api.get(`/events/upcoming?limit=${limit}`);
        return response.data;
    },

    // Get today's stats
    getTodayStats: async () => {
        const response = await api.get('/events/stats/today');
        return response.data;
    },

    // Get counts for a day
    getCountsForDay: async (date) => {
        const response = await api.get(`/events/counts/${date}`);
        return response.data;
    },
};
