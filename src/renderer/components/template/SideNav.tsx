import classNames from 'classnames';
import { memo } from 'react';
import NavItem from '../common/NavItem';
import { navItems } from '../../constants/navigation';
import Logo from '../../../../assets/icon.png';

interface Props {
  isCollapse: boolean;
}

function SideNav({ isCollapse }: Props) {
  return (
    <nav
      className={classNames(
        'hidden sm:block border-r border-gray-200 transition-all duration-300 ease-in-out bg-[#0b51b7]',
        {
          'w-64': !isCollapse,
          'w-16': isCollapse,
        },
      )}
    >
      <div className="flex flex-col h-full p-4">
        <div
          className={classNames(
            'transition-all duration-300 flex justify-center items-center w-auto',
            {
              'opacity-0': isCollapse,
              'opacity-100': !isCollapse,
            },
          )}
        >
          <img
            src="https://mannatthemes.com/metrica/default/assets/images/logo-sm.png"
            alt="Logo"
            className="w-16 h-16"
          />
          {/* <span className="inline-block ml-3"> FPT Telecom </span> */}
        </div>
        <ul className="space-y-4 mt-4">
          {navItems.map((item) => (
            <NavItem
              key={item.name}
              name={item.name}
              path={item.path}
              icon={item.icon}
              children={item.children}
              isCollapse={isCollapse}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default memo(SideNav);
