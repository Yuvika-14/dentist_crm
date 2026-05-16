import React from 'react';
import { Users, Activity, CalendarCheck, ArrowUpRight, Clock, Pill, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const formatDate = (date) => new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
});

const Dashboard = ({ data }) => {
  const navigate = useNavigate();
  const { patients, appointments, medications, history } = data;
  const today = new Date().toISOString().split('T')[0];

  const todayAppointments = appointments
    .filter((appointment) => appointment.date === today && appointment.status !== 'Cancelled')
    .sort((a, b) => a.time.localeCompare(b.time));

  const activeMedications = Object.values(medications)
    .flat()
    .filter((medication) => medication.status === 'Active').length;

  const completedVisits = Object.values(history).flat().length;
  const overdueFollowUps = patients.filter((patient) => (
    patient.nextVisit &&
    patient.nextVisit !== 'Not scheduled' &&
    patient.nextVisit !== 'No visits yet' &&
    patient.nextVisit < today
  ));

  const patientName = (patientId) => patients.find((patient) => patient.id === Number(patientId))?.name || 'Unknown patient';

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Clinic Dashboard</h1>
          <p className="page-subtitle">Monitor patients, visits, appointments, and active prescriptions.</p>
        </div>
        <div className="flex-row gap-4">
          <button className="btn btn-secondary" onClick={() => navigate('/appointments')}>Schedule Visit</button>
          <button className="btn btn-primary" onClick={() => navigate('/patients')}>Open Patients</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-icon bg-primary-light text-primary"><Users size={24} /></div>
          <div>
            <h3>{patients.length}</h3>
            <p>Total patients</p>
          </div>
          <span className="badge badge-success"><ArrowUpRight size={14} /> Live</span>
        </div>

        <div className="card stat-card">
          <div className="stat-icon bg-warning-light text-warning"><CalendarCheck size={24} /></div>
          <div>
            <h3>{todayAppointments.length}</h3>
            <p>Appointments today</p>
          </div>
          <span className="badge badge-primary">{formatDate(today)}</span>
        </div>

        <div className="card stat-card">
          <div className="stat-icon bg-danger-light text-danger"><Pill size={24} /></div>
          <div>
            <h3>{activeMedications}</h3>
            <p>Active medications</p>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon bg-success-light text-success"><Activity size={24} /></div>
          <div>
            <h3>{completedVisits}</h3>
            <p>Clinical history entries</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="section-heading">
            <div>
              <h2>Today's Appointments</h2>
              <p>Scheduled procedures and patient notes</p>
            </div>
            <button className="btn btn-secondary compact-btn" onClick={() => navigate('/appointments')}>View all</button>
          </div>

          {todayAppointments.length === 0 ? (
            <div className="empty-state">
              <CalendarCheck size={32} />
              <p>No appointments scheduled today.</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Patient</th>
                    <th>Procedure</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {todayAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="font-medium"><Clock size={14} /> {appointment.time}</td>
                      <td>{patientName(appointment.patientId)}</td>
                      <td><span className="badge badge-primary">{appointment.procedure}</span></td>
                      <td><span className="badge badge-success">{appointment.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card">
          <div className="section-heading">
            <div>
              <h2>Follow-up Watchlist</h2>
              <p>Patients who need attention</p>
            </div>
          </div>

          {overdueFollowUps.length === 0 ? (
            <div className="empty-state">
              <AlertTriangle size={32} />
              <p>No overdue follow-ups.</p>
            </div>
          ) : (
            <ul className="record-list">
              {overdueFollowUps.map((patient) => (
                <li key={patient.id}>
                  <div>
                    <strong>{patient.name}</strong>
                    <span>{patient.condition}</span>
                  </div>
                  <button className="btn btn-secondary compact-btn" onClick={() => navigate(`/patients/${patient.id}`)}>
                    Open file
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
