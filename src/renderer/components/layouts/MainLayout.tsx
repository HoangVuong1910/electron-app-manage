import React, { memo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../template/SideNav';
import Header from '../template/Header';
import MobileNav from '../template/MobileNav';

export interface Props {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
}

function MainLayoutInner({ children }: Props) {
  const [isSideNavCollapse, setSideNavCollapse] = useState<boolean>(false);

  const toggle = () => {
    setSideNavCollapse((prev) => !prev);
  };

  return (
    <div className="flex flex-auto flex-col">
      <div className="flex flex-auto min-w-0">
        <SideNav isCollapse={isSideNavCollapse} />
        <MobileNav />
        <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
          <Header
            toggleSideNav={toggle}
            isSideNavCollapse={isSideNavCollapse}
          />
          {children}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const MainLayout = memo(MainLayoutInner);

export default MainLayout;
