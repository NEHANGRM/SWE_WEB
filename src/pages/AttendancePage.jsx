import { useState } from 'react';
import { HiOutlineChevronLeft, HiChevronRight, HiOutlineChartPie } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import './AttendancePage.css';

const AttendancePage = () => {
    const navigate = useNavigate();

    const attendanceData = [
        { id: 1, subject: 'Advanced Software Engineering', attended: 12, total: 15, percentage: 80 },
        { id: 2, subject: 'Network Security', attended: 10, total: 12, percentage: 83 },
        { id: 3, subject: 'Database Management', attended: 8, total: 10, percentage: 80 },
    ];

    const overallPercentage = Math.round(
        (attendanceData.reduce((acc, curr) => acc + curr.attended, 0) /
            attendanceData.reduce((acc, curr) => acc + curr.total, 0)) * 100
    );

    return (
        <div className="attendance-content fade-in">
            <header className="page-header-alt">
                <button className="back-btn-ghost" onClick={() => navigate(-1)}>
                    <HiOutlineChevronLeft />
                </button>
                <h2>Attendance Tracker</h2>
            </header>

            <div className="overall-stats-card">
                <div className="stats-main">
                    <div className="percentage-circle">
                        <span className="percent-val">{overallPercentage}%</span>
                        <span className="percent-label">Overall</span>
                    </div>
                    <div className="stats-details">
                        <div className="stat-row">
                            <span className="dot success" />
                            <span>Total Attended: 30</span>
                        </div>
                        <div className="stat-row">
                            <span className="dot error" />
                            <span>Total Classes: 37</span>
                        </div>
                    </div>
                </div>
            </div>

            <section className="subject-list-section">
                <h4 className="section-title">Your Subjects</h4>
                <div className="subject-list">
                    {attendanceData.map((subject) => (
                        <div key={subject.id} className="subject-card card">
                            <div className="subject-header">
                                <h3>{subject.subject}</h3>
                                <div className="subject-badge" style={{
                                    background: subject.percentage >= 75 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: subject.percentage >= 75 ? 'var(--success-green)' : 'var(--error-red)'
                                }}>
                                    {subject.percentage}%
                                </div>
                            </div>

                            <div className="progress-bar-container">
                                <div className="progress-bar-fill" style={{ width: `${subject.percentage}%`, background: subject.percentage >= 75 ? 'var(--success-green)' : 'var(--error-red)' }} />
                            </div>

                            <div className="subject-footer">
                                <span>{subject.attended} attended of {subject.total}</span>
                                <button className="details-btn">
                                    Details <HiChevronRight />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AttendancePage;
