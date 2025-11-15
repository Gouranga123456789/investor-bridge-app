import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; 

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    
    try {
      const API_URL = 'http://localhost:5000/api/auth/login';
      const res = await axios.post(API_URL, { email, password });
      
      login(res.data.token);
      setMessage(res.data.msg);
      setIsError(false);
      
      navigate('/dashboard'); 

    } catch (err) {
      console.error(err.response.data);
      setMessage(err.response.data.msg);
      setIsError(true);
      localStorage.removeItem('token');
    }
  };

  return (
    <form className="form-container" onSubmit={onSubmit}>
      <h2>Login</h2>
      {message && (
        <p className={isError ? 'message message-error' : 'message message-success'}>
          {message}
        </p>
      )}
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
      </div>
      <button type="submit" className="btn">Login</button>
    </form>
  );
}

export default Login;