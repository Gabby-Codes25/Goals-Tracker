'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '../Firebase/firebaseAuth';
import { useCookies } from 'react-cookie';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [_, setCookies] = useCookies(['access_token']);

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
  
    try {
      const user = await signIn(email, password); // Only expecting `user`
  
      //Store user ID in cookies (for session management)
      setCookies('access_token', user.uid, { path: '/' });
  
      // Clear form fields
      setEmail('');
      setPassword('');
  
      console.log("User Logged In:", user);
  
      // Redirect to the goal page
      router.push('/Goal');
    } catch (err) {
      console.error("Login Error:", err.message);
      setError(err.message); // Update UI with actual error message
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-md p-8 w-full sm:w-96">
        <h1 className="text-3xl font-semibold mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
