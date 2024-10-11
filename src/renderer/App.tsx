import { ToastContainer } from 'react-toastify';
import './App.css';
import useRouteElement from './useRouteElement';
import { Link } from 'react-router-dom';
import path from './constants/path';
export default function App() {
  const routeElement = useRouteElement();
  return (
    <div>
      {routeElement}
      <Link
        to={path.products}
        className="flex items-center justify-center px-2 py-4 bg-orange-500 text-white w-full"
      >
        Go to Admin Dashboard
      </Link>
      <ToastContainer />
    </div>
  );
}
