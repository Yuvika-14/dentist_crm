import React, { useState } from 'react';
import { Search, Plus, Eye, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PatientsList = ({ patients, addPatient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', phone: '', condition: 'Healthy' });
  const navigate = useNavigate();

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addPatient({
      ...newPatient,
      age: parseInt(newPatient.age, 10),
      lastVisit: 'N/A',
      nextVisit: 'Not Scheduled'
    });
    setShowAddModal(false);
    setNewPatient({ name: '', age: '', phone: '', condition: 'Healthy' });
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Patient Directory</h1>
          <p className="page-subtitle">Manage and track all patient records.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={18} /> Add New Patient
        </button>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            className="input-field" 
            placeholder="Search patients by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container animate-fade-in">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Contact</th>
              <th>Last Visit</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map(patient => (
                <tr key={patient.id}>
                  <td style={{ color: 'var(--text-muted)' }}>#{patient.id.toString().padStart(4, '0')}</td>
                  <td style={{ fontWeight: 500 }}>{patient.name}</td>
                  <td>{patient.age} yrs</td>
                  <td>
                    <div className="flex-row gap-2">
                       <Phone size={14} color="var(--text-muted)" />
                       {patient.phone}
                    </div>
                  </td>
                  <td>{patient.lastVisit}</td>
                  <td>
                    <span className={`badge ${patient.condition === 'Healthy' ? 'badge-success' : 'badge-warning'}`}>
                      {patient.condition}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-secondary flex-row gap-2" 
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                      onClick={() => navigate(`/patients/${patient.id}`)}
                    >
                      <Eye size={14} /> View File
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
                  <p style={{ color: 'var(--text-muted)' }}>No patients found.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Basic Add Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card animate-fade-in" style={{ width: '400px', backgroundColor: 'var(--surface)' }}>
            <h2 style={{ marginBottom: '20px' }}>Add New Patient</h2>
            <form onSubmit={handleAddSubmit} className="flex-col gap-4">
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <input required type="text" className="input-field" value={newPatient.name} onChange={e => setNewPatient({...newPatient, name: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Age</label>
                <input required type="number" className="input-field" value={newPatient.age} onChange={e => setNewPatient({...newPatient, age: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Phone Number</label>
                <input required type="text" className="input-field" value={newPatient.phone} onChange={e => setNewPatient({...newPatient, phone: e.target.value})} />
              </div>
              <div className="flex-row gap-4" style={{ marginTop: '16px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Patient</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsList;
