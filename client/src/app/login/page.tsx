"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const LoginForm = () => {
  const router = useRouter(); 

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', loginData, {
        withCredentials: true, 
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.status >= 200 && response.status < 300) {
        alert('Login successful!');
        setLoginData({
          email: '',
          password: ''
        });
        router.push('/'); 
      } else if (response.status === 401) {
        alert(response.data.message || 'Login failed.');
      } else {
        alert('Login failed.');
      }
    } catch (error: unknown) {
      console.error('Error:', error);
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message || 'An error occurred. Please try again.');
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleLoginSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Email:</label>
        <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Password:</label>
        <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <p className="mt-4 text-center">Don&apos;t have an account? <Link href="/" className="text-blue-500 hover:underline">Sign Up</Link></p>
      <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Log In</button>
    </form>
  );
};

export default LoginForm; 