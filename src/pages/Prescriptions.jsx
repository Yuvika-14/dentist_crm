import React from 'react';
import { AlertTriangle, CheckCircle2, Pill, Plus, Send } from 'lucide-react';

const Prescriptions = ({ patients, medications }) => {
  const rows = Object.entries(medications)
    .flatMap(([patientId, items]) => {
      const patient = patients.find((entry) => entry.id === Number(patientId));
      return items.map((item) => ({ ...item, patientName: patient?.name || 'Unknown patient' }));
    });

  const activeCount = rows.filter((item) => item.status === 'Active').length;
  const completedCount = rows.filter((item) => item.status === 'Completed').length;

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Prescriptions</h1>
          <p className="page-subtitle">Generate, review, and track digital prescriptions for active patient care.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          New Prescription
        </button>
      </div>

      <div className="prescription-summary-grid">
        <div className="card prescription-summary-card">
          <span className="stat-icon bg-danger-light text-danger"><Pill size={22} /></span>
          <div>
            <h3>{activeCount}</h3>
            <p>Active medications</p>
          </div>
        </div>
        <div className="card prescription-summary-card">
          <span className="stat-icon bg-success-light text-success"><CheckCircle2 size={22} /></span>
          <div>
            <h3>{completedCount}</h3>
            <p>Completed prescriptions</p>
          </div>
        </div>
        <div className="card prescription-summary-card">
          <span className="stat-icon bg-warning-light text-warning"><AlertTriangle size={22} /></span>
          <div>
            <h3>1</h3>
            <p>Allergy safety flag</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="section-heading">
          <div>
            <h2>Prescription Queue</h2>
            <p>Smart prescription tracking with patient safety context.</p>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Medication</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.id}>
                  <td className="font-medium">{item.patientName}</td>
                  <td>{item.name}</td>
                  <td>{item.dosage}</td>
                  <td>{item.frequency}</td>
                  <td>
                    <span className={`badge ${item.status === 'Active' ? 'badge-success' : 'badge-primary'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-secondary compact-btn">
                      <Send size={14} />
                      Send
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="font-medium">Aarav Mehta</td>
                <td>Amoxicillin</td>
                <td>500 mg</td>
                <td>Every 8 hours</td>
                <td><span className="badge badge-danger">Allergy block</span></td>
                <td>
                  <button className="btn btn-danger compact-btn">
                    <AlertTriangle size={14} />
                    Review
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;
