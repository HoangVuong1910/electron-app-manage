import { FaHome, FaCog } from 'react-icons/fa';
import { BsCart3 } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { IoPhonePortraitSharp } from 'react-icons/io5';

import path from './path';

export const navItems = [
  {
    name: 'Dashboard',
    path: path.products,
    icon: <FaHome />,
  },
  {
    name: 'Đơn hàng',
    icon: <BsCart3 />,
    path: path.products,
    children: [{ name: 'Thêm mới', path: path.addProduct }],
  },
  {
    name: 'Sản phẩm',
    icon: <IoPhonePortraitSharp />,
    path: path.products,
    children: [{ name: 'Thêm mới', path: path.addProduct }],
  },
  {
    name: 'Khách hàng',
    icon: <FaUserFriends />,
    path: path.products,
  },
];
