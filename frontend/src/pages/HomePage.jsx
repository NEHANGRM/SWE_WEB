import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { eventService } from '../services/eventService';
import { toast } from 'react-toastify';
import {
    FiSun,
    FiMoon,
    FiLogOut,
    FiCalendar,
    FiBook,
    FiCheckSquare,
    FiUsers
} from 'react-icons/fi';
import {
    MdSchool,
    MdAssignment,
    MdQuiz,
    MdGroups
} from 'react-icons/md';
import './HomePage.css';

const HomePage = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await eventService.getTodayStats();
            setStats(response.data);
        } catch (error) {
            toast.error('Failed to fetch stats');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    const formatDate = () => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date().toLocaleDateString('en-US', options);
    };

    return (
        <div className="home-page">
            {/* Header - matching Flutter AppBar */}
            <header className="home-header">
                <div className="container">
                    <div className="header-content">
                        <div className="header-left">
                            <h1 className="app-title">ClassFlow</h1>
                        </div>
                        <div className="header-right">
                            <button
                                onClick={toggleTheme}
                                className="icon-btn"
                                title={theme === 'light' ? 'Dark mode' : 'Light mode'}
                                aria-label="Toggle theme"
                            >
                                {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
                            </button>
                            <button
                                onClick={handleLogout}
                                className="icon-btn"
                                title="Logout"
                                aria-label="Logout"
                            >
                                <FiLogOut size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="home-main">
                <div className="container">
                    {/* Greeting Section - matching Flutter */}
                    <div className="greeting-section">
                        <h2 className="greeting">{getGreeting()}, {user?.name}!</h2>
                        <p className="date">{formatDate()}</p>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <>
                            {/* Today's Overview Card - EXACT Flutter layout */}
                            <div className="overview-card">
                                <h3 className="overview-title">Today's Overview</h3>

                                {/* Stats Grid - 2x2 layout like Flutter */}
                                <div className="stats-grid">
                                    {/* Classes Card */}
                                    <div className="stat-card classes">
                                        <div className="stat-icon">
                                            <MdSchool />
                                        </div>
                                        <div className="stat-value">{stats?.classes || 0}</div>
                                        <div className="stat-label">Classes</div>
                                    </div>

                                    {/* Tasks Card */}
                                    <div className="stat-card tasks">
                                        <div className="stat-icon">
                                            <MdAssignment />
                                        </div>
                                        <div className="stat-value">{stats?.assignments || 0}</div>
                                        <div className="stat-label">Tasks</div>
                                    </div>

                                    {/* Exams Card */}
                                    <div className="stat-card exams">
                                        <div className="stat-icon">
                                            <MdQuiz />
                                        </div>
                                        <div className="stat-value">{stats?.exams || 0}</div>
                                        <div className="stat-label">Exams</div>
                                    </div>

                                    {/* Meetings Card */}
                                    <div className="stat-card meetings">
                                        <div className="stat-icon">
                                            <MdGroups />
                                        </div>
                                        <div className="stat-value">{stats?.meetings || 0}</div>
                                        <div className="stat-label">Meetings</div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="quick-actions-section">
                                <h3>Quick Actions</h3>
                                <div className="actions-grid">
                                    <button className="action-btn">
                                        <FiCalendar />
                                        <span>Calendar</span>
                                    </button>
                                    <button className="action-btn">
                                        <FiBook />
                                        <span>Timetable</span>
                                    </button>
                                    <button className="action-btn">
                                        <FiCheckSquare />
                                        <span>Attendance</span>
                                    </button>
                                </div>
                            </div>

                            {/* Welcome Message */}
                            <div className="welcome-card">
                                <h3>Welcome to ClassFlow Web! 🎉</h3>
                                <p>
                                    Your Flutter mobile app has been successfully converted to a full-stack web application.
                                    The backend API is running with MongoDB, and this React frontend is ready to use all the features.
                                </p>
                                <div className="feature-list">
                                    <div className="feature-item">✅ Authentication System</div>
                                    <div className="feature-item">✅ Event Management</div>
                                    <div className="feature-item">✅ Timetable System</div>
                                    <div className="feature-item">✅ Attendance Tracking</div>
                                    <div className="feature-item">✅ Dark/Light Theme</div>
                                    <div className="feature-item">✅ Exact Flutter Design</div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default HomePage;
