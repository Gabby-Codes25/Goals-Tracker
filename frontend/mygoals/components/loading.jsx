// Loading.jsx

import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <svg
        className="animate-spin h-10 w-10 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8 8 0 0019.708 15H23.29A10 10 0 006 7.196V5.708A9.966 9.966 0 004 12h4zm6-5.291a6 6 0 016 6h4a10 10 0 00-3.707-7.707A7.975 7.975 0 0012 1v4z"
        ></path>
      </svg>
    </div>
  );
};

export default Loading;
