// src/pages/register.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/reducers/userReducer';
import axios from 'axios';
import { useRouter } from 'next/router';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:4000/register', { email, password, name });
      dispatch(setUser({ email, name }));
      router.push('/');
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
