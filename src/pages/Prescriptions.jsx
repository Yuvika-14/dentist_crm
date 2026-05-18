import React, { useState } from 'react';
import { CheckCircle2, ClipboardList, Edit3, FileText, Pill, Plus, Trash2, X } from 'lucide-react';

const getToday = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const Prescriptions = ({ patients, medications, addMedication, updateMedication, deleteMedication }) => {
  const [selectedInstruction, setSelectedInstruction] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPrescription, setEditingPrescription] = useState(null);
  const [newPrescription, setNewPrescription] = useState({
    patientId: patients[0]?.id || '',
    name: '',
    dosage: '',
    frequency: '',
    startDate: getToday(),
    endDate: '',
    status: 'Active',
    instructions: ''
  });
  const rows = Object.entries(medications)
    .flatMap(([patientId, items]) => {
      const patient = patients.find((entry) => entry.id === Number(patientId));
      return items.map((item) => ({ ...item, patientId: Number(patientId), patientName: patient?.name || 'Unknown patient' }));
    });

  const activeCount = rows.filter((item) => item.status === 'Active').length;
  const completedCount = rows.filter((item) => item.status === 'Completed').length;
  const draftCount = rows.filter((item) => item.status === 'Draft').length;

  const resetPrescriptionForm = () => {
    setNewPrescription({
      patientId: patients[0]?.id || '',
      name: '',
      dosage: '',
      frequency: '',
      startDate: getToday(),
      endDate: '',
      status: 'Active',
      instructions: ''
    });
    setEditingPrescription(null);
  };

  const handleSavePrescription = (event) => {
    event.preventDefault();
    const payload = {
      name: newPrescription.name,
      dosage: newPrescription.dosage,
      frequency: newPrescription.frequency,
      startDate: newPrescription.startDate,
      endDate: newPrescription.endDate,
      status: newPrescription.status,
      instructions: newPrescription.instructions
    };

    if (editingPrescription) {
      updateMedication(editingPrescription.patientId, editingPrescription.id, payload);
    } else {
      addMedication(Number(newPrescription.patientId), payload);
    }

    setShowAddModal(false);
    resetPrescriptionForm();
  };

  const openNewPrescription = () => {
    resetPrescriptionForm();
    setShowAddModal(true);
  };

  const openEditPrescription = (item) => {
    setEditingPrescription(item);
    setNewPrescription({
      patientId: item.patientId,
      name: item.name,
      dosage: item.dosage,
      frequency: item.frequency,
      startDate: item.startDate || getToday(),
      endDate: item.endDate || '',
      status: item.status || 'Active',
      instructions: item.instructions || ''
    });
    setShowAddModal(true);
  };

  const handleDeletePrescription = (item) => {
    if (window.confirm(`Delete ${item.name} for ${item.patientName}?`)) {
      deleteMedication(item.patientId, item.id);
      if (selectedInstruction?.id === item.id) {
        setSelectedInstruction(null);
      }
    }
  };

  return (
    <div className={`page-container${showAddModal || selectedInstruction ? '' : ' animate-fade-in'}`}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Prescriptions</h1>
          <p className="page-subtitle">Generate, review, and track digital prescriptions for active patient care.</p>
        </div>
        <button className="btn btn-primary" onClick={openNewPrescription}>
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
          <span className="stat-icon bg-warning-light text-warning"><FileText size={22} /></span>
          <div>
            <h3>{draftCount}</h3>
            <p>Draft care plans</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="section-heading">
          <div>
            <h2>Prescription Queue</h2>
            <p>Review medicine plans and prepare clear patient instructions.</p>
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
                <th>Care plan</th>
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
                    <div className="prescription-actions">
                      <button className="btn btn-secondary compact-btn" onClick={() => openEditPrescription(item)}>
                        <Edit3 size={14} />
                        Edit
                      </button>
                    <button className="btn btn-secondary compact-btn" onClick={() => setSelectedInstruction(item)}>
                      <ClipboardList size={14} />
                      Instructions
                    </button>
                      <button
                        className="icon-btn prescription-delete-btn"
                        type="button"
                        onClick={() => handleDeletePrescription(item)}
                        aria-label={`Delete ${item.name} prescription`}
                        title="Delete prescription"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="new-prescription-title">
          <section className="modal-card prescription-form-modal">
            <div className="modal-header">
              <div>
                <h2 id="new-prescription-title">{editingPrescription ? 'Edit Prescription' : 'New Prescription'}</h2>
                <p>{editingPrescription ? 'Update medication details and care instructions.' : 'Add medication details and care instructions to the patient record.'}</p>
              </div>
              <button className="icon-btn" type="button" onClick={() => {
                setShowAddModal(false);
                resetPrescriptionForm();
              }} aria-label="Close prescription form">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSavePrescription} className="prescription-form">
              <div className="input-group">
                <label className="input-label">Patient</label>
                <select
                  required
                  className="input-field"
                  disabled={Boolean(editingPrescription)}
                  value={newPrescription.patientId}
                  onChange={(event) => setNewPrescription({ ...newPrescription, patientId: event.target.value })}
                >
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-grid two-col">
                <div className="input-group">
                  <label className="input-label">Medication Name</label>
                  <input required className="input-field" value={newPrescription.name} onChange={(event) => setNewPrescription({ ...newPrescription, name: event.target.value })} />
                </div>
                <div className="input-group">
                  <label className="input-label">Dosage</label>
                  <input required className="input-field" placeholder="500 mg" value={newPrescription.dosage} onChange={(event) => setNewPrescription({ ...newPrescription, dosage: event.target.value })} />
                </div>
              </div>
              <div className="form-grid two-col">
                <div className="input-group">
                  <label className="input-label">Frequency</label>
                  <input required className="input-field" placeholder="Every 8 hours" value={newPrescription.frequency} onChange={(event) => setNewPrescription({ ...newPrescription, frequency: event.target.value })} />
                </div>
                <div className="input-group">
                  <label className="input-label">Status</label>
                  <select className="input-field" value={newPrescription.status} onChange={(event) => setNewPrescription({ ...newPrescription, status: event.target.value })}>
                    <option>Active</option>
                    <option>Draft</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
              <div className="form-grid two-col">
                <div className="input-group">
                  <label className="input-label">Start Date</label>
                  <input type="date" className="input-field" value={newPrescription.startDate} onChange={(event) => setNewPrescription({ ...newPrescription, startDate: event.target.value })} />
                </div>
                <div className="input-group">
                  <label className="input-label">End Date</label>
                  <input type="date" className="input-field" value={newPrescription.endDate} onChange={(event) => setNewPrescription({ ...newPrescription, endDate: event.target.value })} />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Care Instructions</label>
                <textarea className="input-field text-area" placeholder="Take after food. Avoid if irritation occurs." value={newPrescription.instructions} onChange={(event) => setNewPrescription({ ...newPrescription, instructions: event.target.value })} />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => {
                  setShowAddModal(false);
                  resetPrescriptionForm();
                }}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingPrescription ? 'Save Changes' : 'Save Prescription'}</button>
              </div>
            </form>
          </section>
        </div>
      )}

      {selectedInstruction && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="instruction-title">
          <section className="modal-card prescription-instruction-modal">
            <div className="modal-header">
              <div>
                <h2 id="instruction-title">Patient Care Instructions</h2>
                <p>{selectedInstruction.patientName} · {selectedInstruction.name}</p>
              </div>
              <button className="icon-btn" type="button" onClick={() => setSelectedInstruction(null)} aria-label="Close instructions">
                <X size={18} />
              </button>
            </div>

            <div className="instruction-hero">
              <span className="stat-icon bg-primary-light text-primary"><FileText size={22} /></span>
              <div>
                <strong>{selectedInstruction.name}</strong>
                <span>{selectedInstruction.dosage} · {selectedInstruction.frequency}</span>
              </div>
            </div>

            <div className="instruction-grid">
              <article>
                <h3>How to Take</h3>
                <p>{selectedInstruction.instructions || `Take ${selectedInstruction.dosage} ${selectedInstruction.frequency.toLowerCase()} as directed by the dentist.`}</p>
              </article>
              <article>
                <h3>Course Window</h3>
                <p>{selectedInstruction.startDate || 'Today'} to {selectedInstruction.endDate || 'until reviewed'}</p>
              </article>
              <article>
                <h3>Safety Reminder</h3>
                <p>Confirm allergies, avoid missed doses, and call the clinic if swelling, rash, or breathing trouble appears.</p>
              </article>
              <article>
                <h3>Follow-up Note</h3>
                <p>Review pain level and healing response at the next appointment before extending or changing medication.</p>
              </article>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Prescriptions;
