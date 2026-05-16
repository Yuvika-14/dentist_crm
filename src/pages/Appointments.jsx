import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { CalendarPlus, Search, Clock, UserRound, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const emptyAppointment = {
  patientId: '',
  date: new Date().toISOString().split('T')[0],
  time: '09:00',
  procedure: '',
  dentist: '',
  notes: ''
};

const Appointments = ({ patients, appointments, addAppointment, updateAppointment, clinic }) => {
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ ...emptyAppointment, dentist: clinic.defaultDentist });
  const navigate = useNavigate();
  const hasPatients = patients.length > 0;

  const patientName = (patientId) => patients.find((patient) => patient.id === Number(patientId))?.name || 'Unknown patient';

  const filteredAppointments = appointments
    .filter((appointment) => {
      const patient = patientName(appointment.patientId).toLowerCase();
      const search = query.toLowerCase();
      return patient.includes(search) || appointment.procedure.toLowerCase().includes(search) || appointment.status.toLowerCase().includes(search);
    })
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!hasPatients) {
      return;
    }
    addAppointment({ ...newAppointment, patientId: Number(newAppointment.patientId) });
    setShowModal(false);
    setNewAppointment({ ...emptyAppointment, dentist: clinic.defaultDentist });
  };

  const appointmentModal = showModal ? createPortal(
    <div className="modal-backdrop">
      <div className="card modal-card animate-fade-in">
        <div className="modal-header">
          <div>
            <h2>Schedule Appointment</h2>
            <p>Create a visit linked to a patient file.</p>
          </div>
          <button className="icon-btn" onClick={() => setShowModal(false)} aria-label="Close appointment form"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex-col gap-4">
          <div className="input-group">
            <label className="input-label">Patient</label>
            {hasPatients ? (
              <select required className="input-field" value={newAppointment.patientId} onChange={(event) => setNewAppointment({ ...newAppointment, patientId: event.target.value })}>
                <option value="">Select patient</option>
                {patients.map((patient) => <option key={patient.id} value={patient.id}>{patient.name}</option>)}
              </select>
            ) : (
              <div className="empty-inline">
                <p>Add a patient record before scheduling an appointment.</p>
                <button type="button" className="btn btn-secondary compact-btn" onClick={() => navigate('/patients')}>
                  Add Patient
                </button>
              </div>
            )}
          </div>
          <div className="form-grid two-col">
            <div className="input-group"><label className="input-label">Date</label><input required type="date" className="input-field" value={newAppointment.date} onChange={(event) => setNewAppointment({ ...newAppointment, date: event.target.value })} /></div>
            <div className="input-group"><label className="input-label">Time</label><input required type="time" className="input-field" min={clinic.openTime} max={clinic.closeTime} value={newAppointment.time} onChange={(event) => setNewAppointment({ ...newAppointment, time: event.target.value })} /></div>
          </div>
          <div className="input-group"><label className="input-label">Procedure</label><input required className="input-field" value={newAppointment.procedure} onChange={(event) => setNewAppointment({ ...newAppointment, procedure: event.target.value })} /></div>
          <div className="input-group"><label className="input-label">Dentist</label><input required className="input-field" value={newAppointment.dentist} onChange={(event) => setNewAppointment({ ...newAppointment, dentist: event.target.value })} /></div>
          <div className="input-group"><label className="input-label">Notes</label><textarea className="input-field text-area" value={newAppointment.notes} onChange={(event) => setNewAppointment({ ...newAppointment, notes: event.target.value })} /></div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={!hasPatients}>Save Appointment</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Appointments</h1>
          <p className="page-subtitle">Schedule patient visits and track clinic workflow status.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <CalendarPlus size={18} /> New Appointment
        </button>
      </div>

      <div className="toolbar-card">
        <div className="search-wrapper wide-search">
          <Search className="search-icon" size={18} />
          <input className="input-field" placeholder="Search appointments..." value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
        <span className="badge badge-primary">{filteredAppointments.length} appointments</span>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Patient</th>
              <th>Procedure</th>
              <th>Dentist</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td><strong>{appointment.date}</strong><span className="table-note"><Clock size={13} /> {appointment.time}</span></td>
                <td><span className="flex-row gap-2"><UserRound size={15} /> {patientName(appointment.patientId)}</span></td>
                <td>{appointment.procedure}</td>
                <td>{appointment.dentist}</td>
                <td>
                  <select className="input-field compact-select" value={appointment.status} onChange={(event) => updateAppointment(appointment.id, { status: event.target.value })}>
                    <option>Scheduled</option>
                    <option>Checked in</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </td>
                <td className="muted">{appointment.notes || 'No notes'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {appointmentModal}
    </div>
  );
};

export default Appointments;
