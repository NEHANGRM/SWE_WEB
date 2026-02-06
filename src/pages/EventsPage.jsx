import { useState } from 'react';
import { HiOutlineSortAscending, HiOutlineCheckCircle, HiOutlineClock, HiPlus } from 'react-icons/hi';
import './EventsPage.css';

const EventsPage = () => {
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const filters = ['all', 'class', 'exam', 'assignment', 'meeting', 'personal', 'other'];

    const mockEvents = [
        { id: 1, title: 'Advanced Software Engineering', type: 'class', time: '10:00 AM', status: 'pending', date: 'Today' },
        { id: 2, title: 'Final Project Submission', type: 'assignment', time: '11:59 PM', status: 'pending', date: 'Tomorrow' },
        { id: 3, title: 'Security Quiz', type: 'exam', time: '02:00 PM', status: 'pending', date: 'Today' },
    ];

    const getIconColor = (type) => {
        switch (type) {
            case 'class': return 'var(--class-blue)';
            case 'assignment': return 'var(--assignment-purple)';
            case 'exam': return 'var(--exam-orange)';
            case 'meeting': return 'var(--meeting-teal)';
            case 'personal': return 'var(--personal-green)';
            default: return 'var(--other-gray)';
        }
    };

    return (
        <div className="events-content fade-in">
            <header className="page-header">
                <h2>Events</h2>
                <div className="header-actions">
                    <button className="icon-btn">
                        <HiOutlineSortAscending />
                    </button>
                </div>
            </header>

            <div className="filter-chips">
                {filters.map((f) => (
                    <button
                        key={f}
                        className={`chip ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            <div className="events-list">
                {mockEvents.map((event) => (
                    <div key={event.id} className="event-card card">
                        <div className="event-icon-box" style={{ background: `rgba(${getIconColor(event.type)}, 0.08)`, color: getIconColor(event.type) }}>
                            <HiOutlineClock />
                        </div>
                        <div className="event-details">
                            <h4>{event.title}</h4>
                            <div className="event-meta">
                                <span className="event-type" style={{ color: getIconColor(event.type) }}>
                                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                </span>
                                <span className="dot">•</span>
                                <span className="event-time">{event.time}</span>
                            </div>
                        </div>
                        <div className="event-status">
                            <HiOutlineCheckCircle className="status-icon" />
                        </div>
                    </div>
                ))}
            </div>

            <button className="fab">
                <HiPlus /> New Event
            </button>
        </div>
    );
};

export default EventsPage;
