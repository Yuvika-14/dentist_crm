import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Stethoscope, Lock, User, ArrowLeft, Loader } from 'lucide-react';

const Login = ({ clinic }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate network delay for premium feel
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
      <div className="login-card animate-fade-in">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </button>
        
        <div className="login-header">
          <div className="login-logo">
            <Stethoscope size={32} color="var(--primary)" />
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to {clinic?.name || 'Dental CRM'} admin</p>
        </div>

        {error && (
          <div className="login-alert error">
            {error}
          </div>
        )}

        <div className="login-alert info">
          <strong>Demo Credentials:</strong><br />
          Username: <code>admin</code><br />
          Password: <code>admin123</code>
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
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            <div className="input-icon-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                className="input-field with-icon"
                placeholder="••••••••"
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
            {isLoading ? <Loader size={20} className="spinner" /> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
