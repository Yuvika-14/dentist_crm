import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PatientsList from './pages/PatientsList';
import PatientDetail from './pages/PatientDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';

const initialPatients = [
  { id: 1, name: 'Eleanor Shellstrop', age: 34, phone: '(555) 012-3456', lastVisit: '2026-04-10', nextVisit: '2026-10-10', condition: 'Healthy' },
  { id: 2, name: 'Chidi Anagonye', age: 36, phone: '(555) 098-7654', lastVisit: '2026-04-20', nextVisit: '2026-05-05', condition: 'Cavity Treatment' },
  { id: 3, name: 'Tahani Al-Jamil', age: 31, phone: '(555) 111-2222', lastVisit: '2026-03-15', nextVisit: '2026-09-15', condition: 'Teeth Whitening' }
];

const initialHistory = {
  1: [
    { id: 101, date: '2026-04-10', type: 'Procedure', notes: 'Routine checkup and cleaning. No cavities.' },
    { id: 102, date: '2025-10-12', type: 'Consultation', notes: 'Patient complained of slight sensitivity. Applied fluoride varnish.' }
  ],
  2: [
    { id: 201, date: '2026-04-20', type: 'Procedure', notes: 'Identified cavity on molar 14. Scheduled filling.' },
    { id: 202, date: '2026-02-14', type: 'Emergency', notes: 'Chipped tooth repair (composite).' }
  ],
  3: [
    { id: 301, date: '2026-03-15', type: 'Procedure', notes: 'Laser teeth whitening session 1/3.' }
  ]
};

const initialMedications = {
  1: [],
  2: [
    { id: 1, name: 'Amoxicillin 500mg', dosage: '1 capsule every 8 hours', status: 'Active' },
    { id: 2, name: 'Ibuprofen 400mg', dosage: 'As needed for pain', status: 'Active' }
  ],
  3: []
};

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function AppContent() {
  const [patients, setPatients] = useState(initialPatients);
  const [history, setHistory] = useState(initialHistory);
  const [medications, setMedications] = useState(initialMedications);

  const addPatient = (patient) => {
    const newId = patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1;
    setPatients([...patients, { ...patient, id: newId }]);
    setHistory({ ...history, [newId]: [] });
    setMedications({ ...medications, [newId]: [] });
  };

  const addVisit = (patientId, visit) => {
    const newVisitId = Math.random().toString(36).substring(7);
    setHistory({
      ...history,
      [patientId]: [{ id: newVisitId, ...visit }, ...(history[patientId] || [])]
    });
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard patients={patients} />} />
        <Route path="patients" element={<PatientsList patients={patients} addPatient={addPatient} />} />
        <Route path="patients/:id" element={<PatientDetail patients={patients} history={history} medications={medications} addVisit={addVisit} />} />
        <Route path="appointments" element={<div className="page-container animate-fade-in"><h1 className="page-title">Appointments</h1><p className="page-subtitle">This feature is coming soon.</p></div>} />
        <Route path="settings" element={<div className="page-container animate-fade-in"><h1 className="page-title">Settings</h1><p className="page-subtitle">This feature is coming soon.</p></div>} />
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
