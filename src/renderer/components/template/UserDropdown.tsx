import { useState, memo } from 'react';
import { Link } from 'react-router-dom';

function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <img
          className="w-8 h-8 rounded-full object-cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0A0OJjf1TGH96cXDQjfnhVSIo_P1XoRRpgA&s"
          alt="User Avatar"
        />

        <span className="hidden md:inline-block text-[#384a65]">imstephen</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white  border-gray-200  rounded-md shadow-lg">
          <Link
            to="/"
            className="block px-4 py-2 text-gray-700  hover:bg-gray-200 "
          >
            Profile
          </Link>
          <Link
            to="/"
            className="block px-4 py-2 text-gray-700  hover:bg-gray-200 "
          >
            Settings
          </Link>
          <button
            onClick={() => console.log('Logout')}
            className="w-full text-left px-4 py-2 text-gray-700  hover:bg-gray-200 "
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
