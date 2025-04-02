'use client';

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../app/Firebase/firebaseAuth';
import { useRouter } from 'next/navigation';

function Page() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/Login");
      }
    
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [router]);

  return (
    <div className="container mx-auto p-4">
        <div>
          <h1 className="text-3xl font-bold mb-4">My Goals</h1>
          <h2 className="text-3xl font-bold mb-4">Welcome to your goals planner</h2>
          <h2>Please login to view your goals</h2>
        </div>
    </div>
  );
}

export default Page;
