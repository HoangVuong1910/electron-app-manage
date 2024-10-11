import { useState } from 'react';
import { memo } from 'react';
import { FaTimes } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { navItems } from '../../constants/navigation';
import NavItem from '../common/NavItem';

function MobileNav() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  return (
    <div className="sm:hidden bg-[#0b51b7]">
      <button
        className="p-4 text-gray-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <GiHamburgerMenu className="w-6 h-6 text-white" />
      </button>

      {/* Modal*/}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-[#0b51b7] transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          className="absolute top-4 right-4 p-2"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes className="h-6 w-6 text-white " />
        </button>
        {/* <nav className="flex flex-col space-y-4 p-8">
          <a href="/" className="text-gray-700 dark:text-gray-300">
            Dashboard
          </a>
          <a href="/settings" className="text-gray-700 dark:text-gray-300">
            Settings
          </a>
        </nav> */}
        <nav className="flex flex-col space-y-4 p-8">
          <ul className="space-y-4 mt-4">
            {navItems.map((item) => (
              <NavItem
                key={item.name}
                name={item.name}
                path={item.path}
                icon={item.icon}
                children={item.children}
              />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default memo(MobileNav);
