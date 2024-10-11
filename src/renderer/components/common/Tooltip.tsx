import React from 'react';
import classNames from 'classnames';

interface Props {
  children: React.ReactNode;
  tooltipText: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

function Tooltip({ children, tooltipText, position = 'bottom' }: Props) {
  return (
    <div className="relative group">
      {children}
      <span
        className={classNames(
          'absolute z-10 px-2 py-1 text-sm text-white bg-black rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap',
          {
            'left-full top-1/2 transform -translate-y-1/2 ml-2':
              position === 'right',
            'right-full top-1/2 transform -translate-y-1/2 mr-2':
              position === 'left',
            'top-full left-1/2 transform -translate-x-1/2 mt-2':
              position === 'bottom',
            'bottom-full left-1/2 transform -translate-x-1/2 mb-2':
              position === 'top',
          },
        )}
      >
        {tooltipText}
      </span>
    </div>
  );
}

export default Tooltip;
