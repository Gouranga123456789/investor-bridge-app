import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'User', 
  });
  
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate(); 

  const { email, password, role } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    console.log('onSubmit function successfully called!');
    e.preventDefault();
    setMessage(''); 
    setIsError(false);
    
    try {
      const API_URL = 'http://localhost:5000/api/auth/register';
      
      const res = await axios.post(API_URL, { email, password, role });
      
      console.log(res.data); 
      setMessage(res.data.msg); 
      setIsError(false);
      
      setFormData({ email: '', password: '', role: 'User' });
      setTimeout(() => {
        navigate('/login');
      }, 2000); 

    } catch (err) {
      console.error(err.response.data);
      setMessage(err.response.data.msg);
      setIsError(true);
    }
  };

  return (
    <form className="form-container" onSubmit={onSubmit}>
      <h2>Register</h2>
      
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
          placeholder="Password (min 6 characters)"
          name="password"
          value={password}
          onChange={onChange}
          minLength="6"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="role">Register as:</label>
        <select id="role" name="role" value={role} onChange={onChange}>
          <option value="User">General User</option>
          <option value="Investor">Investor</option>
          <option value="Business">Business Person</option>
          <option value="Banker">Banker</option>
          <option value="Advisor">Business Advisor</option>
        </select>
      </div>
      <button type="submit" className="btn">Register</button>
    </form>
  );
}

export default Register;