'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [cookies, setCookies, removeCookie] = useCookies(['access_token']);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    removeCookie('access_token', { path: '/' });
    router.push('/Login');
  };

  return (
    <header className="bg-gradient-to-r from-red-500 to-red-700 py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="font-bold text-white text-3xl">
          <Link href="/">Goals</Link>
        </h1>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation */}
        <nav
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-red-600 md:bg-transparent p-5 md:p-0 md:flex items-center gap-5 transition-all ${
            isOpen ? 'block' : 'hidden md:flex'
          }`}
        >
          <ul className="flex flex-col md:flex-row gap-4 text-white text-lg">
            {cookies.access_token && (
              <li>
                <Link href="/Goal" className="hover:text-gray-200">
                  Goals
                </Link>
              </li>
            )}
            {cookies.access_token && (
              <li>
                <Link href="/Form" className="hover:text-gray-200">
                  Add Goal
                </Link>
              </li>
            )}
            {!cookies.access_token ? (
              <>
                <li>
                  <Link href="/Register" className="hover:text-gray-200">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/Login" className="hover:text-gray-200">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-all"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
