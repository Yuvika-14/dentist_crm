import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PatientsList from './pages/PatientsList';
import PatientDetail from './pages/PatientDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import Appointments from './pages/Appointments';
import Settings from './pages/Settings';
import { AuthProvider, useAuth } from './context/AuthContext';

const STORAGE_KEY = 'novaDentalCrmDataV3';
const today = new Date().toISOString().split('T')[0];

const initialData = {
  patients: [
    {
      id: 1,
      name: 'Aarav Mehta',
      age: 34,
      gender: 'Male',
      phone: '(555) 218-4401',
      email: 'aarav.mehta@example.com',
      address: '18 Maple Street, Midtown',
      condition: 'Root canal follow-up',
      allergies: 'Penicillin',
      bloodGroup: 'B+',
      emergencyContact: 'Riya Mehta - (555) 218-4402',
      lastVisit: '2026-05-10',
      nextVisit: today,
      notes: 'Prefers morning appointments. Mild dental anxiety noted.'
    },
    {
      id: 2,
      name: 'Maya Chen',
      age: 29,
      gender: 'Female',
      phone: '(555) 640-1937',
      email: 'maya.chen@example.com',
      address: '42 Lakeview Road',
      condition: 'Clear aligner review',
      allergies: 'None reported',
      bloodGroup: 'O+',
      emergencyContact: 'Daniel Chen - (555) 640-1940',
      lastVisit: '2026-05-08',
      nextVisit: '2026-05-24',
      notes: 'Aligner tray 7 issued. Check fit and attachment comfort.'
    },
    {
      id: 3,
      name: 'Sofia Rivera',
      age: 46,
      gender: 'Female',
      phone: '(555) 775-9021',
      email: 'sofia.rivera@example.com',
      address: '7 Garden Court',
      condition: 'Periodontal maintenance',
      allergies: 'Latex sensitivity',
      bloodGroup: 'A-',
      emergencyContact: 'Marco Rivera - (555) 775-9022',
      lastVisit: '2026-04-28',
      nextVisit: '2026-05-14',
      notes: 'Monitor lower molar pockets. Uses interdental brushes.'
    },
    {
      id: 4,
      name: 'Noah Patel',
      age: 12,
      gender: 'Male',
      phone: '(555) 301-8244',
      email: 'parent.patel@example.com',
      address: '91 Cedar Lane',
      condition: 'Sealant check',
      allergies: 'None reported',
      bloodGroup: 'AB+',
      emergencyContact: 'Priya Patel - (555) 301-8245',
      lastVisit: '2026-05-01',
      nextVisit: '2026-06-01',
      notes: 'Parent accompanies patient. Reward chart works well.'
    },
    {
      id: 5,
      name: 'Emma Wilson',
      age: 58,
      gender: 'Female',
      phone: '(555) 912-3308',
      email: 'emma.wilson@example.com',
      address: '303 Pine Avenue',
      condition: 'Crown preparation',
      allergies: 'Sulfa drugs',
      bloodGroup: 'O-',
      emergencyContact: 'Olivia Wilson - (555) 912-3310',
      lastVisit: '2026-05-12',
      nextVisit: today,
      notes: 'Temporary crown fitted on UR5. Confirm bite comfort.'
    }
  ],
  history: {
    1: [
      { id: 101, date: '2026-05-10', type: 'Procedure', tooth: 'LL6', diagnosis: 'Irreversible pulpitis', notes: 'Completed canal preparation and placed calcium hydroxide dressing.', nextStep: 'Review symptoms and obturate if settled.' },
      { id: 102, date: '2026-04-30', type: 'Emergency', tooth: 'LL6', diagnosis: 'Acute pain', notes: 'Radiograph taken. Started endodontic access and pain management.', nextStep: 'Continue root canal treatment.' }
    ],
    2: [
      { id: 201, date: '2026-05-08', type: 'Follow-up', tooth: 'General', diagnosis: 'Aligner progress review', notes: 'Tracking well. Mild pressure on lower incisors within expected range.', nextStep: 'Move to tray 8 after 10 days.' }
    ],
    3: [
      { id: 301, date: '2026-04-28', type: 'Checkup', tooth: 'General', diagnosis: 'Gingival inflammation', notes: 'Scaling completed. Reinforced brushing technique and interdental cleaning.', nextStep: 'Four-week periodontal review.' }
    ],
    4: [
      { id: 401, date: '2026-05-01', type: 'Procedure', tooth: 'UR6, UL6', diagnosis: 'Deep fissures', notes: 'Applied fissure sealants. Good cooperation throughout.', nextStep: 'Review sealants at next hygiene visit.' }
    ],
    5: [
      { id: 501, date: '2026-05-12', type: 'Procedure', tooth: 'UR5', diagnosis: 'Fractured restoration', notes: 'Prepared tooth and placed temporary crown. Shade selected A2.', nextStep: 'Fit final crown when lab work returns.' }
    ]
  },
  medications: {
    1: [
      { id: 1001, name: 'Ibuprofen', dosage: '400 mg', frequency: 'Every 8 hours if needed', startDate: '2026-05-10', endDate: '2026-05-13', status: 'Completed', instructions: 'Take after food. Avoid if stomach irritation occurs.' }
    ],
    2: [],
    3: [
      { id: 3001, name: 'Chlorhexidine mouthwash', dosage: '10 ml', frequency: 'Twice daily', startDate: '2026-04-28', endDate: '2026-05-12', status: 'Completed', instructions: 'Do not rinse with water immediately after use.' }
    ],
    4: [],
    5: [
      { id: 5001, name: 'Acetaminophen', dosage: '500 mg', frequency: 'Every 6 hours if needed', startDate: '2026-05-12', endDate: '', status: 'Active', instructions: 'Use only if temporary crown discomfort appears.' }
    ]
  },
  appointments: [
    { id: 1, patientId: 1, date: today, time: '09:30', procedure: 'Root canal follow-up', dentist: 'Dr. Smith', status: 'Scheduled', notes: 'Check LL6 tenderness before obturation.' },
    { id: 2, patientId: 5, date: today, time: '11:00', procedure: 'Temporary crown review', dentist: 'Dr. Smith', status: 'Checked in', notes: 'Patient reported slight high bite.' },
    { id: 3, patientId: 2, date: '2026-05-24', time: '14:30', procedure: 'Aligner progress review', dentist: 'Dr. Smith', status: 'Scheduled', notes: 'Tray 8 fit check.' },
    { id: 4, patientId: 4, date: '2026-06-01', time: '16:00', procedure: 'Sealant review', dentist: 'Dr. Smith', status: 'Scheduled', notes: 'Parent requested late afternoon.' }
  ],
  clinic: {
    name: 'NovaDental Clinic',
    phone: '(555) 700-8844',
    email: 'frontdesk@novadental.test',
    address: '24 Care Avenue, Suite 8',
    openTime: '09:00',
    closeTime: '18:00',
    defaultDentist: 'Dr. Smith'
  }
};

const readStoredData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return initialData;
    }

    const parsed = { ...initialData, ...JSON.parse(stored) };
    return hasDemoRecords(parsed) ? parsed : initialData;
  } catch {
    return initialData;
  }
};

const hasDemoRecords = (data) => data.patients?.length > 0 || data.appointments?.length > 0;

const createId = (items) => {
  const numericIds = items.map((item) => Number(item.id)).filter(Number.isFinite);
  return numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;
};

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function AppContent() {
  const [data, setData] = useState(readStoredData);

  useEffect(() => {
    setData((current) => (hasDemoRecords(current) ? current : initialData));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const actions = useMemo(() => ({
    addPatient: (patient) => {
      setData((current) => {
        const newId = createId(current.patients);
        const cleanPatient = {
          id: newId,
          lastVisit: 'No visits yet',
          nextVisit: patient.nextVisit || 'Not scheduled',
          condition: patient.condition || 'New patient',
          allergies: patient.allergies || 'None reported',
          notes: patient.notes || '',
          ...patient,
          age: Number(patient.age)
        };

        return {
          ...current,
          patients: [...current.patients, cleanPatient],
          history: { ...current.history, [newId]: [] },
          medications: { ...current.medications, [newId]: [] }
        };
      });
    },
    updatePatient: (patientId, updates) => {
      setData((current) => ({
        ...current,
        patients: current.patients.map((patient) => (
          patient.id === patientId ? { ...patient, ...updates, age: Number(updates.age ?? patient.age) } : patient
        ))
      }));
    },
    deletePatient: (patientId) => {
      setData((current) => {
        const nextHistory = { ...current.history };
        const nextMedications = { ...current.medications };

        delete nextHistory[patientId];
        delete nextMedications[patientId];

        return {
          ...current,
          patients: current.patients.filter((patient) => patient.id !== patientId),
          appointments: current.appointments.filter((appointment) => Number(appointment.patientId) !== patientId),
          history: nextHistory,
          medications: nextMedications
        };
      });
    },
    addVisit: (patientId, visit) => {
      setData((current) => ({
        ...current,
        history: {
          ...current.history,
          [patientId]: [{ id: Date.now(), ...visit }, ...(current.history[patientId] || [])]
        },
        patients: current.patients.map((patient) => (
          patient.id === patientId
            ? { ...patient, lastVisit: visit.date, condition: visit.diagnosis || patient.condition }
            : patient
        ))
      }));
    },
    addMedication: (patientId, medication) => {
      setData((current) => ({
        ...current,
        medications: {
          ...current.medications,
          [patientId]: [{ id: Date.now(), ...medication }, ...(current.medications[patientId] || [])]
        }
      }));
    },
    updateMedicationStatus: (patientId, medicationId, status) => {
      setData((current) => ({
        ...current,
        medications: {
          ...current.medications,
          [patientId]: (current.medications[patientId] || []).map((medication) => (
            medication.id === medicationId ? { ...medication, status } : medication
          ))
        }
      }));
    },
    addAppointment: (appointment) => {
      setData((current) => ({
        ...current,
        appointments: [...current.appointments, { id: createId(current.appointments), status: 'Scheduled', ...appointment }]
      }));
    },
    updateAppointment: (appointmentId, updates) => {
      setData((current) => ({
        ...current,
        appointments: current.appointments.map((appointment) => (
          appointment.id === appointmentId ? { ...appointment, ...updates } : appointment
        ))
      }));
    },
    saveClinic: (clinic) => {
      setData((current) => ({ ...current, clinic }));
    },
    clearClinicRecords: () => {
      setData((current) => ({
        ...current,
        patients: [],
        history: {},
        medications: {},
        appointments: []
      }));
    }
  }), []);

  return (
    <Routes>
      <Route path="/" element={<Home data={data} />} />
      <Route path="/login" element={<Login clinic={data.clinic} />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout clinic={data.clinic} />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard data={data} />} />
        <Route path="patients" element={<PatientsList patients={data.patients} addPatient={actions.addPatient} deletePatient={actions.deletePatient} />} />
        <Route
          path="patients/:id"
          element={(
            <PatientDetail
              patients={data.patients}
              history={data.history}
              medications={data.medications}
              appointments={data.appointments}
              addVisit={actions.addVisit}
              addMedication={actions.addMedication}
              updateMedicationStatus={actions.updateMedicationStatus}
              updatePatient={actions.updatePatient}
              deletePatient={actions.deletePatient}
            />
          )}
        />
        <Route
          path="appointments"
          element={(
            <Appointments
              patients={data.patients}
              appointments={data.appointments}
              addAppointment={actions.addAppointment}
              updateAppointment={actions.updateAppointment}
              clinic={data.clinic}
            />
          )}
        />
        <Route
          path="settings"
          element={(
            <Settings
              clinic={data.clinic}
              recordCounts={{
                patients: data.patients.length,
                appointments: data.appointments.length,
                history: Object.values(data.history).flat().length,
                medications: Object.values(data.medications).flat().length
              }}
              saveClinic={actions.saveClinic}
              clearClinicRecords={actions.clearClinicRecords}
            />
          )}
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
