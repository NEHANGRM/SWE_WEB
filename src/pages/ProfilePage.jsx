import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
    HiOutlineUser,
    HiOutlineAcademicCap,
    HiOutlineCalendar,
    HiOutlineOfficeBuilding,
    HiOutlineMoon,
    HiOutlineSun,
    HiOutlineLogout,
    HiOutlineChevronRight
} from 'react-icons/hi';
import './ProfilePage.css';

const ProfilePage = () => {
    const { logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();

    const sections = [
        {
            title: 'Personal Information',
            items: [
                { label: 'Name', value: 'Student User', icon: HiOutlineUser },
                { label: 'Role', value: 'Student', icon: HiOutlineAcademicCap },
                { label: 'Semester', value: 'Spring 2026', icon: HiOutlineCalendar },
                { label: 'Institution', value: 'University Name', icon: HiOutlineOfficeBuilding },
            ]
        }
    ];

    return (
        <div className="profile-content fade-in">
            <header className="page-header">
                <h2>Profile & Settings</h2>
            </header>

            <div className="profile-header-card card">
                <div className="avatar-box">
                    <HiOutlineUser />
                </div>
                <div className="profile-info">
                    <h3>Student User</h3>
                    <p>Computer Science</p>
                </div>
            </div>

            {sections.map((section, idx) => (
                <div key={idx} className="profile-section">
                    <h4 className="section-title">{section.title}</h4>
                    <div className="card list-card">
                        {section.items.map((item, i) => (
                            <div key={i} className="list-item">
                                <item.icon className="item-icon" />
                                <div className="item-content">
                                    <span className="item-label">{item.label}</span>
                                    <span className="item-value">{item.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div className="profile-section">
                <h4 className="section-title">Appearance</h4>
                <div className="card list-card">
                    <div className="list-item clickable" onClick={toggleTheme}>
                        {isDark ? <HiOutlineMoon className="item-icon" /> : <HiOutlineSun className="item-icon" />}
                        <div className="item-content">
                            <span className="item-label">Dark Mode</span>
                            <span className="item-value">{isDark ? 'On' : 'Off'}</span>
                        </div>
                        <div className={`toggle-switch ${isDark ? 'active' : ''}`}>
                            <div className="toggle-thumb" />
                        </div>
                    </div>
                </div>
            </div>

            <button className="btn-filled logout-btn" onClick={logout} style={{ background: 'var(--error-red)' }}>
                <HiOutlineLogout /> Sign Out
            </button>
        </div>
    );
};

export default ProfilePage;
