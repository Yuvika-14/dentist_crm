import React from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Settings, Stethoscope, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout = ({ clinic }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Patients', path: '/patients', icon: <Users size={20} /> },
    { name: 'Appointments', path: '/appointments', icon: <Calendar size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div className="sidebar-logo-icon">
            <Stethoscope size={24} />
          </div>
          {clinic?.name || 'Dental CRM'}
        </div>

        <nav className="nav-links">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
               <NavLink
                key={item.name}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
        
        <div style={{ padding: '24px 16px', marginTop: 'auto' }}>
          <button className="nav-item" style={{ width: '100%', border: 'none', background: 'none', color: 'var(--danger)', cursor: 'pointer' }} onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-header">
          <div className="search-wrapper">
            {/* Optional global search can go here */}
          </div>
          
          <div className="header-user">
            <button className="btn" style={{ padding: '8px', color: 'var(--text-muted)' }}>
              <Bell size={20} />
            </button>
            <div className="user-avatar">
              {user?.username ? user.username.charAt(0).toUpperCase() : 'Dr'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>{user?.username ? `Dr. ${user.username}` : 'Dr. Admin'}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{clinic?.defaultDentist || 'Clinic Admin'}</span>
            </div>
          </div>
        </header>

        <section className="page-wrapper" style={{ flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;
