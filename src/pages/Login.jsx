import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, CalendarCheck, Loader, Lock, ShieldCheck, Sparkles, Stethoscope, User } from 'lucide-react';

const Login = ({ clinic }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';
  const clinicName = clinic?.name || 'Dental CRM';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const result = login(username, password);
      setIsLoading(false);

      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.message);
      }
    }, 800);
  };

  return (
    <div className="login-container">
      <div className="login-shell animate-fade-in">
        <section className="login-card">
          <button className="login-brand" onClick={() => navigate('/')}>
            <span className="login-brand-icon">
              <Stethoscope size={20} />
            </span>
            {clinicName}
          </button>

          <div className="login-header">
            <span className="login-eyebrow">Clinic admin portal</span>
            <h2>Welcome back</h2>
            <p>Sign in to manage patients, appointments, visits, and care notes.</p>
          </div>

          {error && (
            <div className="login-alert error">
              {error}
            </div>
          )}

          <div className="login-alert info">
            <strong>Demo credentials</strong>
            <span>Username: <code>admin</code> | Password: <code>admin123</code></span>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label className="input-label">Username</label>
              <div className="input-icon-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  className="input-field with-icon"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <div className="flex-row justify-between w-full">
                <label className="input-label">Password</label>
                <button type="button" className="forgot-password">Forgot Password?</button>
              </div>
              <div className="input-icon-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  className="input-field with-icon"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={isLoading}
            >
              {isLoading ? <Loader size={20} className="spinner" /> : <>Sign In <ArrowRight size={18} /></>}
            </button>
          </form>
        </section>

        <section className="login-showcase" aria-label="Dental CRM overview">
          <div className="login-showcase-content">
            <div className="showcase-badge">
              <Sparkles size={16} />
              Smart dental workspace
            </div>
            <h1>Run your clinic from one secure dashboard.</h1>
            <p>Track every patient visit, schedule follow-ups, and keep clinical notes close to the chairside workflow.</p>

            <div className="showcase-metrics">
              <div>
                <CalendarCheck size={18} />
                <strong>Appointments</strong>
                <span>Daily schedule ready</span>
              </div>
              <div>
                <ShieldCheck size={18} />
                <strong>Care safety</strong>
                <span>Allergies and notes visible</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
