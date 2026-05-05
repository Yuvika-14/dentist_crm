import React from 'react';
import { Users, Activity, CalendarCheck, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ patients }) => {
  const navigate = useNavigate();

  const todayAppointments = [
    { id: 1, time: '09:00 AM', name: 'Martha Stewart', type: 'Checkup' },
    { id: 2, time: '10:30 AM', name: 'Gordon Ramsay', type: 'Root Canal' },
    { id: 3, time: '02:00 PM', name: 'Guy Fieri', type: 'Consultation' },
  ];

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Welcome back, Dr. Smith!</h1>
          <p className="page-subtitle">Here is what's happening at the clinic today.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/patients')}>
          View All Patients
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Stat Cards */}
        <div className="card">
          <div className="flex-row justify-between" style={{ marginBottom: '16px' }}>
            <div style={{ padding: '12px', backgroundColor: 'var(--primary-light)', borderRadius: '12px', color: 'var(--primary)' }}>
              <Users size={24} />
            </div>
            <span className="badge badge-success flex-row gap-2">
              <ArrowUpRight size={14} /> +4%
            </span>
          </div>
          <div>
            <h3 style={{ fontSize: '28px', marginBottom: '4px' }}>{patients.length}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Total Patients</p>
          </div>
        </div>

        <div className="card">
          <div className="flex-row justify-between" style={{ marginBottom: '16px' }}>
            <div style={{ padding: '12px', backgroundColor: 'var(--warning-light)', borderRadius: '12px', color: 'var(--warning)' }}>
              <CalendarCheck size={24} />
            </div>
            <span className="badge badge-success flex-row gap-2">
              <ArrowUpRight size={14} /> +2%
            </span>
          </div>
          <div>
            <h3 style={{ fontSize: '28px', marginBottom: '4px' }}>{todayAppointments.length}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Appointments Today</p>
          </div>
        </div>

        <div className="card">
          <div className="flex-row justify-between" style={{ marginBottom: '16px' }}>
            <div style={{ padding: '12px', backgroundColor: 'var(--danger-light)', borderRadius: '12px', color: 'var(--danger)' }}>
              <Activity size={24} />
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '28px', marginBottom: '4px' }}>12</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Pending Treatments</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Appointments Table */}
        <div className="card">
          <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Today's Appointments</h2>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Patient Name</th>
                  <th>Procedure</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {todayAppointments.map((app) => (
                  <tr key={app.id}>
                    <td style={{ fontWeight: 500 }}>{app.time}</td>
                    <td>{app.name}</td>
                    <td><span className="badge badge-primary">{app.type}</span></td>
                    <td>
                      <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions or Reminders */}
        <div className="card">
          <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Quick Reminders</h2>
          <ul className="flex-col gap-4">
            <li className="flex-row gap-4" style={{ paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--danger)' }} />
              <div>
                <p style={{ fontSize: '14px', fontWeight: 500 }}>Order composite fillings</p>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Due today</span>
              </div>
            </li>
            <li className="flex-row gap-4" style={{ paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--warning)' }} />
              <div>
                <p style={{ fontSize: '14px', fontWeight: 500 }}>Call Lab for crowns</p>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Due tomorrow</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
