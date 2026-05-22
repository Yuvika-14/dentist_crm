import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Search, Plus, Eye, Phone, Mail, X, Trash2, Users, AlertTriangle, CalendarCheck, ShieldCheck, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const emptyPatient = {
  name: '',
  age: '',
  gender: 'Female',
  phone: '',
  email: '',
  address: '',
  condition: 'New patient',
  allergies: 'None reported',
  bloodGroup: '',
  emergencyContact: '',
  nextVisit: '',
  notes: ''
};

const PatientsList = ({ patients, addPatient, deletePatient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatient, setNewPatient] = useState(emptyPatient);
  const navigate = useNavigate();

  const filteredPatients = patients.filter((patient) => {
    const query = searchTerm.toLowerCase();
    return [patient.name, patient.phone, patient.email, patient.condition]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query));
  });
  const today = new Date().toISOString().split('T')[0];
  const upcomingVisits = patients.filter((patient) => patient.nextVisit && patient.nextVisit >= today).length;
  const allergyFlags = patients.filter((patient) => patient.allergies && patient.allergies !== 'None reported').length;
  const activeTreatmentPlans = patients.filter((patient) => patient.condition && patient.condition !== 'New patient').length;

  const handleAddSubmit = (event) => {
    event.preventDefault();
    addPatient(newPatient);
    setShowAddModal(false);
    setNewPatient(emptyPatient);
  };

  const handleDelete = (patient) => {
    if (window.confirm(`Delete ${patient.name}'s patient record and linked appointments?`)) {
      deletePatient(patient.id);
    }
  };

  const addPatientModal = showAddModal ? createPortal(
    <div className="modal-backdrop">
      <div className="card modal-card large-modal animate-fade-in">
        <div className="modal-header">
          <div>
            <h2>Add Patient</h2>
            <p>Create a complete dental record for future visits.</p>
          </div>
          <button className="icon-btn" onClick={() => setShowAddModal(false)} aria-label="Close add patient form">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleAddSubmit} className="form-grid">
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input required type="text" className="input-field" value={newPatient.name} onChange={(event) => setNewPatient({ ...newPatient, name: event.target.value })} />
          </div>
          <div className="input-group">
            <label className="input-label">Age</label>
            <input required type="number" min="1" className="input-field" value={newPatient.age} onChange={(event) => setNewPatient({ ...newPatient, age: event.target.value })} />
          </div>
          <div className="input-group">
            <label className="input-label">Gender</label>
            <select className="input-field" value={newPatient.gender} onChange={(event) => setNewPatient({ ...newPatient, gender: event.target.value })}>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </div>
          <div className="input-group">
            <label className="input-label">Phone Number</label>
            <input required type="tel" className="input-field" value={newPatient.phone} onChange={(event) => setNewPatient({ ...newPatient, phone: event.target.value })} />
          </div>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input type="email" className="input-field" value={newPatient.email} onChange={(event) => setNewPatient({ ...newPatient, email: event.target.value })} />
          </div>
          <div className="input-group">
            <label className="input-label">Blood Group</label>
            <input type="text" className="input-field" value={newPatient.bloodGroup} onChange={(event) => setNewPatient({ ...newPatient, bloodGroup: event.target.value })} />
          </div>
          <div className="input-group">
            <label className="input-label">Current Condition</label>
            <input type="text" className="input-field" value={newPatient.condition} onChange={(event) => setNewPatient({ ...newPatient, condition: event.target.value })} />
          </div>
          <div className="input-group">
            <label className="input-label">Next Visit</label>
            <input type="date" className="input-field" value={newPatient.nextVisit} onChange={(event) => setNewPatient({ ...newPatient, nextVisit: event.target.value })} />
          </div>
          <div className="input-group span-2">
            <label className="input-label">Address</label>
            <input type="text" className="input-field" value={newPatient.address} onChange={(event) => setNewPatient({ ...newPatient, address: event.target.value })} />
          </div>
          <div className="input-group">
            <label className="input-label">Allergies</label>
            <input type="text" className="input-field" value={newPatient.allergies} onChange={(event) => setNewPatient({ ...newPatient, allergies: event.target.value })} />
          </div>
          <div className="input-group">
            <label className="input-label">Emergency Contact</label>
            <input type="text" className="input-field" value={newPatient.emergencyContact} onChange={(event) => setNewPatient({ ...newPatient, emergencyContact: event.target.value })} />
          </div>
          <div className="input-group span-2">
            <label className="input-label">Clinical Notes</label>
            <textarea className="input-field text-area" value={newPatient.notes} onChange={(event) => setNewPatient({ ...newPatient, notes: event.target.value })} />
          </div>
          <div className="modal-actions span-2">
            <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Patient</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <div className="page-container animate-fade-in">
      <div className="dashboard-hero patients-hero">
        <div>
          <span className="dashboard-kicker"><Stethoscope size={16} /> Patient command center</span>
          <h1 className="page-title">Patient Directory</h1>
          <p className="page-subtitle">Maintain patient profiles, medical risks, contact details, and follow-up dates.</p>
        </div>
        <div className="dashboard-hero-actions">
          
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} /> Add Patient
          </button>
        </div>
      </div>

      <div className="stats-grid patients-stats-grid">
        <div className="card stat-card">
          <div className="stat-icon bg-primary-light text-primary"><Users size={24} /></div>
          <div>
            <h3>{patients.length}</h3>
            <p>Total patients</p>
          </div>
          <span className="badge badge-success"><ShieldCheck size={14} /> Live</span>
        </div>
        <div className="card stat-card">
          <div className="stat-icon bg-warning-light text-warning"><CalendarCheck size={24} /></div>
          <div>
            <h3>{upcomingVisits}</h3>
            <p>Upcoming visits</p>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon bg-danger-light text-danger"><AlertTriangle size={24} /></div>
          <div>
            <h3>{allergyFlags}</h3>
            <p>Allergy flags</p>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon bg-success-light text-success"><Stethoscope size={24} /></div>
          <div>
            <h3>{activeTreatmentPlans}</h3>
            <p>Treatment plans</p>
          </div>
        </div>
      </div>

      <div className="toolbar-card patients-toolbar">
        <div className="search-wrapper wide-search">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="input-field"
            placeholder="Search by name, phone, email, or treatment status..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <span className="badge badge-primary">{filteredPatients.length} records</span>
      </div>

      <div className="card patients-directory-card animate-fade-in">
        <div className="section-heading">
          <div>
            <h2>Patient Records</h2>
            <p>Clinical overview with contact, visit, and treatment status at a glance.</p>
          </div>
        </div>
        <div className="table-container patients-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Contact</th>
              <th>Last Visit</th>
              <th>Next Visit</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td className="muted">#{patient.id.toString().padStart(4, '0')}</td>
                  <td>
                    <div className="person-cell">
                      <div className="mini-avatar">{patient.name.charAt(0)}</div>
                      <div>
                        <strong>{patient.name}</strong>
                        <span>{patient.age} yrs, {patient.gender}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-stack">
                      <span><Phone size={14} /> {patient.phone}</span>
                      <span><Mail size={14} /> {patient.email || 'No email'}</span>
                    </div>
                  </td>
                  <td>{patient.lastVisit}</td>
                  <td>{patient.nextVisit || 'Not scheduled'}</td>
                  <td><span className="badge badge-warning">{patient.condition}</span></td>
                  <td>
                    <div className="table-actions" style={{ flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
                      <button className="btn btn-secondary compact-btn" onClick={() => navigate(`/patients/${patient.id}`)}>
                        <Eye size={14} /> View
                      </button>
                      <button className="btn btn-danger compact-btn" onClick={() => handleDelete(patient)} title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">
                  <div className="empty-state">
                    <Search size={32} />
                    <p>No patient records match your search.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>

      {addPatientModal}
    </div>
  );
};

export default PatientsList;
