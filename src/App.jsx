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

const STORAGE_KEY = 'novaDentalCrmDataV2';

const initialData = {
  patients: [],
  history: {},
  medications: {},
  appointments: [],
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
    return stored ? { ...initialData, ...JSON.parse(stored) } : initialData;
  } catch {
    return initialData;
  }
};

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
