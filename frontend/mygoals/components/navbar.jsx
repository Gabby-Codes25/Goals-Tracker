'use client'

// Import necessary dependencies
import React from 'react';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

function Navbar() {
  const [cookies, setCookies] = useCookies(['access_token']);

  const router = useRouter()

  const logout = () => {
    setCookies('access_token', '');
    window.localStorage.removeItem('userID');
    router.push('/Login');
  };

  return (
    <div className='bg-red-400 py-5 px-8'>
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
          <h1 className='font-bold text-2xl md:text-3xl'>
            <Link href='/'>Goals</Link>
          </h1>
          <nav className='mt-4 md:mt-0'>
            <ul className='flex gap-3'>
              {/* Display "Add Goal" link only if the user is logged in */}
              {cookies.access_token && (
                <li>
                  <Link href='/Form'>Add Goal</Link>
                </li>
              )}
              {!cookies.access_token ? (
                <>
                  <li>
                    <Link href='/Register'>Register</Link>
                  </li>
                  <li>
                    <Link href='/Login'>Login</Link>
                  </li>
                </>
              ) : (
                <button
                  className='text-white bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600'
                  onClick={logout}
                >
                  Logout
                </button>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
