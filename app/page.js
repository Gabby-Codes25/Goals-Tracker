'use client';

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../app/Firebase/firebaseAuth';
import GoalsPage from '../app/Goal/page'; // Import your GoalsPage

function Page() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  if (loading) return <p>Loading...</p>; // Prevents flickering

  return (
    <div className="container mx-auto p-4">
      {user ? (
        <GoalsPage /> // Show GoalsPage if user is logged in
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4">My Goals</h1>
          <h2>Please login to view your goals</h2>
          <h1 className="text-3xl font-bold mb-4">Welcome to your goals planner</h1>
        </div>
      )}
    </div>
  );
}

export default Page;
