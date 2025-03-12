"use client";

import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/signup', formData, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        alert('Signup successful!');
        setFormData({
          username: '',
          email: '',
          password: ''
        });
      } else {
        alert('Signup failed.');
      }
    } catch (error: any) {
      if (error?.response && error?.response?.data && error?.response?.data?.message) {
        alert(error?.response?.data?.message || 'An error occurred. Please try again.');
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <p className="mt-4 text-center">Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Sign In</Link></p>
      <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Sign Up</button>
    </form>
  );
};

// Render the SignupForm component
const App = () => {
  return (
    <div>
      <h1>Signup</h1>
      <SignupForm />
    </div>
  );
};

export default App;
