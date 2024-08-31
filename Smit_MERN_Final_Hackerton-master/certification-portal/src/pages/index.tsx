// src/index.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

const IndexPage = () => {
  const router = useRouter();
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/students/login', { rollNumber, password });
      if (response.data.success) {
        // Redirect to student dashboard or certificate download page
        router.push(`/students/dashboard?rollNumber=${rollNumber}`);
      } else {
        setError('Invalid roll number or password');
      }
    } catch (err) {
      setError('Error logging in. Please try again.');
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <h1 className="text-4xl font-bold mb-10">Welcome to Certificate Portal</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Student Login</h1>
        <form onSubmit={handleLogin}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="rollNumber" className="block text-gray-700">
              Roll Number
            </label>
            <input
              type="text"
              id="rollNumber"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p>
            Not a student? <Link href="/admin/login">Admin Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
