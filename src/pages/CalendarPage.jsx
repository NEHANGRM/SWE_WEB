import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { HiPlus } from 'react-icons/hi';
import './CalendarPage.css';

const CalendarPage = () => {
    const [date, setDate] = useState(new Date());

    const mockDayEvents = [
        { id: 1, title: 'Software Engineering Class', type: 'class', time: '10:00 AM' },
        { id: 2, title: 'Project Discussion', type: 'meeting', time: '04:00 PM' },
    ];

    const getIconColor = (type) => {
        switch (type) {
            case 'class': return 'var(--class-blue)';
            case 'meeting': return 'var(--meeting-teal)';
            default: return 'var(--primary-blue)';
        }
    };

    return (
        <div className="calendar-content fade-in">
            <header className="page-header">
                <h2>Calendar</h2>
            </header>

            <div className="calendar-wrapper card">
                <Calendar
                    onChange={setDate}
                    value={date}
                    className="custom-calendar"
                    next2Label={null}
                    prev2Label={null}
                />
            </div>

            <div className="day-events-section">
                <div className="section-header">
                    <h4>{date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</h4>
                    <span className="event-count">{mockDayEvents.length} Events</span>
                </div>

                <div className="mini-events-list">
                    {mockDayEvents.map((event) => (
                        <div key={event.id} className="mini-event-card card">
                            <div className="event-indicator" style={{ background: getIconColor(event.type) }} />
                            <div className="mini-event-details">
                                <h5>{event.title}</h5>
                                <span className="mini-event-time">{event.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button className="fab">
                <HiPlus /> New Event
            </button>
        </div>
    );
};

export default CalendarPage;
