// NavItem.tsx
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import classNames from 'classnames';
import Tooltip from './Tooltip';
import { Link } from 'react-router-dom';

interface Props {
  name: string;
  path: string;
  icon?: JSX.Element;
  children?: Props[];
  isCollapse?: boolean;
}

function NavItem({ name, path, icon, children, isCollapse }: Props) {
  const [collapse, setCollapse] = useState<Boolean>(false);

  const toggle = () => {
    setCollapse((prev) => !prev);
  };

  return (
    <li>
      <Tooltip tooltipText={name}>
        <div
          className={classNames(
            'flex items-center py-2 text-white/60 hover:bg-[#1256b9] border-transparent rounded cursor-pointer group',
            {
              'px-2': isCollapse,
              'px-4': !isCollapse,
            },
          )}
          onClick={children ? toggle : undefined}
        >
          <span className="mr-2">{icon}</span>
          <span
            className={classNames('transition-all duration-300 ease-in-out', {
              'opacity-0': isCollapse,
              'opacity-100': !isCollapse,
            })}
          >
            <Link to={path}>{name}</Link>
          </span>
          {children && (
            <FaChevronDown
              className={`ml-auto transform transition-transform ${
                collapse ? 'rotate-180' : ''
              }`}
            />
          )}
        </div>
      </Tooltip>

      {children && collapse && !isCollapse && (
        <ul key={name} className="ml-6 space-y-2">
          {children.map((child) => (
            <Tooltip tooltipText={child.name}>
              <li key={child.name}>
                <Link
                  to={child.path}
                  className="block px-4 py-2 text-white/60 hover:bg-[#1256b9] border-transparent rounded"
                >
                  {child.name}
                </Link>
              </li>
            </Tooltip>
          ))}
        </ul>
      )}
    </li>
  );
}

export default NavItem;
