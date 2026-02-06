import React, { useState } from 'react';
import {
    HiOutlineX,
    HiOutlineAcademicCap,
    HiOutlinePencilAlt,
    HiOutlineFolder,
    HiOutlineCalendar,
    HiOutlineLocationMarker,
    HiOutlineMenuAlt2,
    HiOutlineInformationCircle,
    HiOutlineClipboardList,
    HiOutlineUsers,
    HiOutlineQuestionMarkCircle,
    HiOutlineEmojiHappy,
    HiOutlineCheckCircle
} from 'react-icons/hi';
import './AddEventModal.css';

const AddEventModal = ({ isOpen, onClose, initialType = 'class' }) => {
    const [activeTab, setActiveTab] = useState('Details');
    const [classification, setClassification] = useState(initialType);

    if (!isOpen) return null;

    const classifications = [
        { id: 'class', label: 'Class', icon: HiOutlineAcademicCap, color: 'var(--class-blue)' },
        { id: 'exam', label: 'Exam', icon: HiOutlineInformationCircle, color: 'var(--exam-orange)' },
        { id: 'assignment', label: 'Assignment', icon: HiOutlineClipboardList, color: 'var(--assignment-purple)' },
        { id: 'meeting', label: 'Meeting', icon: HiOutlineUsers, color: 'var(--meeting-teal)' },
        { id: 'personal', label: 'Personal', icon: HiOutlineEmojiHappy, color: 'var(--personal-green)' },
        { id: 'other', label: 'Other', icon: HiOutlineQuestionMarkCircle, color: 'var(--other-gray)' },
    ];

    const tabs = ['Details', 'Advanced', 'Notes'];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <header className="modal-header">
                    <div className="header-left">
                        <div className="header-icon-box">
                            <HiOutlineAcademicCap />
                        </div>
                        <div className="header-text">
                            <h2>Create Event</h2>
                            <p>{classification.charAt(0).toUpperCase() + classification.slice(1)}</p>
                        </div>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <HiOutlineX />
                    </button>
                </header>

                {/* Tabs */}
                <div className="modal-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            className={`tab-item ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Form Content */}
                <div className="modal-body">
                    {activeTab === 'Details' && (
                        <div className="form-section fade-in">
                            <div className="input-field">
                                <label className="field-label-float">
                                    <HiOutlinePencilAlt className="field-icon" />
                                    <input type="text" placeholder="Event Title" />
                                </label>
                            </div>

                            <div className="classification-section">
                                <span className="label-text">Classification</span>
                                <div className="chips-grid">
                                    {classifications.map(type => {
                                        const Icon = type.icon;
                                        const isActive = classification === type.id;
                                        return (
                                            <button
                                                key={type.id}
                                                className={`type-chip ${isActive ? 'active' : ''}`}
                                                style={{
                                                    '--chip-color': type.color,
                                                    borderColor: isActive ? type.color : 'var(--border-color)',
                                                    background: isActive ? `rgba(${isActive ? '59, 130, 246' : '0, 0, 0'}, 0.1)` : 'transparent'
                                                }}
                                                onClick={() => setClassification(type.id)}
                                            >
                                                <Icon className="chip-icon" />
                                                <span>{type.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="input-field">
                                <label className="field-label-float">
                                    <HiOutlineFolder className="field-icon" />
                                    <div className="dropdown-mock">
                                        <span>Category (Optional)</span>
                                        <HiOutlineX className="dropdown-arrow" style={{ transform: 'rotate(90deg)' }} />
                                    </div>
                                    <select className="hidden-select">
                                        <option>No category</option>
                                    </select>
                                </label>
                            </div>

                            <div className="date-time-group">
                                <div className="input-field">
                                    <span className="field-tag">Start Date/Time</span>
                                    <label className="field-label-float">
                                        <HiOutlineCalendar className="field-icon" />
                                        <input type="text" defaultValue="Fri, Feb 6, 2026 • 9:12 PM" />
                                    </label>
                                </div>
                                <div className="input-field">
                                    <span className="field-tag">End Date/Time</span>
                                    <label className="field-label-float">
                                        <HiOutlineCalendar className="field-icon" />
                                        <input type="text" defaultValue="Fri, Feb 6, 2026 • 10:12 PM" />
                                    </label>
                                </div>
                            </div>

                            <div className="input-field">
                                <label className="field-label-float">
                                    <HiOutlineLocationMarker className="field-icon" />
                                    <input type="text" placeholder="Location (Optional)" />
                                </label>
                            </div>

                            <div className="input-field">
                                <label className="field-label-float textarea-field">
                                    <HiOutlineMenuAlt2 className="field-icon" />
                                    <textarea placeholder="Notes (Optional)" rows="4"></textarea>
                                </label>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <footer className="modal-footer">
                    <button className="btn-submit" onClick={onClose}>
                        <HiOutlineCheckCircle /> Create Event
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default AddEventModal;
