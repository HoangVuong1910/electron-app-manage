import UserDropdown from './UserDropdown';
import { FaBars, FaArrowLeft } from 'react-icons/fa';
import { IoIosNotificationsOutline } from 'react-icons/io';

interface Props {
  toggleSideNav: () => void;
  isSideNavCollapse: boolean;
}

function Header({ toggleSideNav, isSideNavCollapse }: Props) {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSideNav} className="p-2 hidden sm:block">
          {isSideNavCollapse ? (
            <FaBars className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          ) : (
            <FaArrowLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          )}
        </button>
        <div className="text-xl font-bold text-[#384a65]">Dashboard</div>
      </div>

      <div className="flex items-center space-x-4 gap-6">
        <button className="relative flex justify-center">
          <IoIosNotificationsOutline className="h-6 w-6 text-[#384a65]" />
          <span className="absolute left-[16px] top-[-8px] rounded-full px-[9px] py-[1px] text-xs text-white bg-[#1256b9]">
            3
          </span>
        </button>
        <UserDropdown />
      </div>
    </header>
  );
}

export default Header;
